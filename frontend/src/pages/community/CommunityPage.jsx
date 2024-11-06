import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import CommunityHeader from './CommunityHeader'
import CommunityLeftSection from './CommunityLeftSection'
import CommunityRightSection from './CommunityRightSection'





const CommunityPage = () => {
    const { name } = useParams()
    const { data: communityProfile, isLoading, isError, error} = useQuery({
        queryKey: ["communityProfile"],
        queryFn: async () => {
            try {
                const res = await fetch(`/api/communities/${name}`)
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                console.log("COMMUNITY_PROFILE: " , data)
                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })


    const { data: communityPosts, isLoading: isLoadingCommunityPosts} = useQuery({
        queryKey: ['communityPosts'],
        queryFn: async () => {
            try {
                const res = await fetch(`/api/posts/community/${name}`)
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                console.log("COMMUNITY_POSTS: " , data)
                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })

    if(isError){
        return <h3>{error}</h3>
    }


    return (
        <div className='w-full scroll-smooth h-[89vh] scrollbar-thumb-slate-800 scrollbar-thin scrollbar-track-transparent overflow-y-scroll montserrat-my pb-8'>
            <CommunityHeader />
            <div className='flex gap-6 mx-28 mt-4'>
                <CommunityLeftSection />
                <CommunityRightSection />
            </div>
        </div>
    )
}

export default CommunityPage