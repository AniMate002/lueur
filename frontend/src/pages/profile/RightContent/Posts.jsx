
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import SinglePost from '../../../components/SinglePost'

const Posts = () => {
    const { data:userPosts, isLoading: postsIsLoading } = useQuery({queryKey: ['userPosts']})
    if(postsIsLoading){
        return <div className='skeleton w-full h-[240px] mt-8'></div>
    }
    if(userPosts.length === 0){
        return <div className='w-full text-center mt-20 text-3xl text-slate-500'>This user does not have posts</div>
    }
    const renderedPosts = userPosts?.map(post => <SinglePost {...post} key={post._id}/>)
    return (
        <div>
            {renderedPosts}
        </div>
    )
}

export default Posts