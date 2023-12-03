import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";

import User from "@models/user";
import { connectToDatabase } from "@utils/database";

const handler = NextAuth({
  providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
		})
	],
	callbacks: {
		async session({ session }) {
			await connectToDatabase();

			const user = await User.findOne({ email: session.user.email });

			session.user.id = user._id.toString();

			return session;
		},
		async signIn({ profile }) {
			try {
				await connectToDatabase();

				const user = await User.findOne({ email: profile.email });

				if (user) {
					return true;
				}

				await User.create({
					email: profile.email,
					username: profile.username,
					discordId: profile.id,
					image: profile.avatar,
				});

				return true;
			} catch (error) {
				console.log(error);
			}
		}
	}
})

export { handler as GET, handler as POST };