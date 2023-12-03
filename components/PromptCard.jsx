"use client";

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  const [ copied, setCopied ] = useState("")

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }
  
  return (
	  <div className="prompt_card">
      <div className="flex justify-between gap-4 flex-start">
        <div
          onClick={handleProfileClick}
          className="flex items-center flex-1 gap-2 cursor-pointer justify-strat"
        >
          <Image
            src={`https://cdn.discordapp.com/avatars/${post.creator.discordId}/${post.creator.image}.png`}
            alt={post.creator.username}
            width={40}
            height={40}
            className="object-contain rounded-full"
          />

          <h3 className="font-semibold text-gray-900 font-satoshi">{post.creator.username}</h3>
        </div>

        <div className="copy_btn" onClick={() => handleCopy()}>
          <Image
            src={copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            alt="Copy"
            width={16}
            height={16}
            className="object-contain"
          />
        </div>
      </div>

      <p className="my-4 text-sm text-gray-700 font-satoshi">
        {post.prompt}
      </p>

      <p
        className="text-sm transition cursor-pointer hover:underline font-inter blue_gradient"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="flex items-center gap-4 pt-2 mt-4 border-t border-gray-300">
          <p
            className="text-sm cursor-pointer font-inter green_gradient"
            onClick={handleEdit}
          >
            Edit
          </p>

          <p
            className="text-sm cursor-pointer font-inter orange_gradient"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard