import { useQuery } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import CommunitiesHeader from './CommunitiesHeader'
import { SingleCommunityCard } from './SingleCommunityCard'





const CommunitiesPage = () => {
    const { data: communities, isLoading, isError, error } = useQuery({
        queryKey: ['communities'],
        queryFn: async () => {
            try {
                const res = await fetch('/api/communities')
                const data = await res.json()
                if(data.error) throw new Error(data.error)

                console.log("ALL_COMMUNITIES: ", data)
                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })

    if(isLoading){
        return <h3>Loading</h3>
    }
    if(isError){
        return <h3>Error: {error}</h3>
    }

    const renderedCommunities = communities.map(community => <SingleCommunityCard key={community._id} {...community}/>)

    return (
        <div className='px-10 pt-10 w-full scroll-smooth h-[89vh] scrollbar-thumb-slate-800 scrollbar-thin scrollbar-track-transparent overflow-y-scroll'>
            <CommunitiesHeader />

            <div className='grid grid-cols-4 gap-4 mt-8'>
                { renderedCommunities }
            </div>

        </div>
    )
}

export default CommunitiesPage