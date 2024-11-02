import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import SingleFollowingCard from './SingleFollowingCard'
import { FaRegSadTear } from "react-icons/fa";



const FollowingCards = ({ sortType, searchQuery }) => {
    const [displayedFollowing, setDisplayedFollowing] = useState([]) // Combined state for sorted and filtered list
    const { data: authUser, isLoading, isError } = useQuery({ queryKey: ['authUser'] })

    if (isLoading) {
        return <h3>Loading</h3>
    }

    // Consolidate filtering and sorting logic in one effect
    useEffect(() => {
        if (!isError && !isLoading && authUser?.following) {
            // Start with the original list each time
            let updatedFollowing = [...authUser.following]

            // Apply filtering based on search query
            if (searchQuery) {
                updatedFollowing = updatedFollowing.filter(user => {
                    if (searchQuery.startsWith("@")) {
                        return user.username.toLowerCase().includes(searchQuery.substring(1).toLowerCase())
                    } else {
                        return user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
                    }
                })
            }

            // Apply sorting based on sortType
            if (sortType !== "default") {
                updatedFollowing.sort((a, b) => {
                    let field, index

                    if (sortType === "alphasc") {
                        field = 'fullname'
                        index = 1
                    } else if (sortType === "alphdesc") {
                        field = 'fullname'
                        index = -1
                    } else if (sortType === "folldesc") {
                        field = 'followers'
                        index = -1
                    } else if (sortType === "follasc") {
                        field = 'followers'
                        index = 1
                    }

                    if (a[field] < b[field]) {
                        return -index
                    }
                    if (a[field] > b[field]) {
                        return index
                    }
                    return 0
                })
            }

            // Update the displayed list
            setDisplayedFollowing(updatedFollowing)
        }
    }, [sortType, searchQuery, authUser, isError, isLoading])

    const renderedFollowingCards = displayedFollowing?.map(user => (
        <SingleFollowingCard key={user._id} {...user} />
    ))

    if(displayedFollowing?.length === 0){
        return <p className='text-slate-300 w-fit mx-auto text-center mt-56 text-4xl bg-[rgb(28,28,37)] px-10 py-16 rounded-xl'>No users found <FaRegSadTear className='inline' /></p>
    }

    return (
        <div className='grid grid-cols-2 gap-6 mt-8'>
            {renderedFollowingCards}
        </div>
    )
}

export default FollowingCards
