import Feed from "@components/Feed"

const Home = () => {
  return (
	<section className="flex-col w-full flex-center">
		<div className="text-center head_text">
			<h1>Share & Discover</h1>
			<span className="orange_gradient">AI POWERED PROMPTS</span>
		</div>
		<p className="text-center desc">
			Promptopa is an open-source AI promptng tool for modern world to discover, create and share creative prompts.
		</p>

		<Feed />
	</section>
  )
}

export default Home