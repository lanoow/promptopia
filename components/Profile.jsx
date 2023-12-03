import PromptCard from "./PromptCard"

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
	return (
		<section className="w-full">
			<h1 className="text-left head_text blue_gradient">{name} Profile</h1>
			<p className="text-left desc">{desc}</p>

			<div className="mt-8 prompt_layout">
				{data.map((post) => (
					<PromptCard
						key={post._id}
						post={post}
						handleEdit={() => handleEdit && handleEdit(post)}
						handleDelete={() => handleDelete && handleDelete(post)}
					/>
				))}
			</div>
		</section>
	)
}

export default Profile