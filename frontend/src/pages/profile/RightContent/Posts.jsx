
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import SinglePost from '../../../components/SinglePost'

const Posts = () => {
    const { data:userPosts, isLoading: postsIsLoading } = useQuery({queryKey: ['userPosts']})
    const renderedPosts = userPosts?.map(post => <SinglePost {...post} key={post._id}/>)
    if(postsIsLoading){
        return <div className='skeleton w-full h-[240px] mt-8'></div>
    }
    return (
        <div>
            {renderedPosts}
        </div>
    )
}

export default Posts