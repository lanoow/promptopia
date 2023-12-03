import Link from "next/link"

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
	  <section className="flex-col w-full max-w-full flex-start">
      <h1 className="text-left head_text">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="max-w-md text-left desc">
        {type} and share amazing prompts with the world! Let your imagination run wild with any AI-powered platform!
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-2xl gap-6 mt-8 glassmorphism"
      >
        <label>
          <span className="text-base font-semibold text-gray-700 font-satoshi">
            Your AI Prompt
          </span>
          
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="text-base font-semibold text-gray-700 font-satoshi">
            Tag {` `}
            <span className="font-normal">(#product, #webdev, #idea)</span>
          </span>
          
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="gap-4 mx-2 mb-4 flex-end">
            <Link href="/" className="text-sm text-gray-400 transition hover:text-gray-900">
              Cancel
            </Link>

            <button type="submit" disabled={submitting} className="px-4 py-2 text-white transition rounded-full bg-primary-orange hover:bg-primary-orange/75">
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
        </div>
      </form>
    </section>
  )
}

export default Form