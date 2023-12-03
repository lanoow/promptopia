"use client"

import { useState, useEffect } from 'react'

import Profile from '@components/Profile'

const UserProfile = ({ params }) => {
	const [ user, setUser ] = useState({})
	const [ userPosts, setUserPosts ] = useState([])

	useEffect(() => {
		const fetchUser = async () => {
			const response = await fetch(`/api/users/${params?.id}`)
			const data = await response.json()

			setUser(data)
		}

		const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) {
			fetchUser();
			fetchPosts();
		}
	}, [params.id])

	return (
		<Profile
			name={user.username}
			desc={`Welcome to ${user.username}'s profile!`}
			data={userPosts}
		/>
	)
}

export default UserProfile