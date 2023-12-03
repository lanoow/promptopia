import { connectToDatabase } from "@utils/database";
import User from "@models/user";

export const GET = async (request, { params }) => {
	try {
		await connectToDatabase();

		const user = await User.findById(params.id).exec();

		return new Response(JSON.stringify(user), {status: 200});
	} catch (error) {
		return new Response("Failed to fetch user!", {status: 500});
	}
}