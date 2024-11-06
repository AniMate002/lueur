import { useQuery } from '@tanstack/react-query'
import React from 'react'
import SinglePost from "../../components/SinglePost"
import CreatePost from '../profile/RightContent/CreatePost'



const CommunityRightSection = () => {
    const { data: communityProfile, isLoading } = useQuery({queryKey: ['communityProfile']})
    const { data: communityPosts, isLoading: isLoadingCommunityPosts } = useQuery({queryKey: ['communityPosts']})

    if(isLoading || isLoadingCommunityPosts){
        return <h3>RigthSection Loading</h3>
    }


    const renderedCommunityPosts = communityPosts.map(post => <SinglePost key={post._id} {...post}/>)

    return (
        <div className='grow '>
            <div className='rounded-xl p-6 bg-[rgb(28,28,37)] mb-6'>
                <p className='text-xl text-slate-300'>About Company</p>
                <p className='text-sm text-slate-500 mt-4'>{communityProfile.about}</p>
            </div>
            <CreatePost />
            {renderedCommunityPosts}
        </div>
    )
}

export default CommunityRightSection