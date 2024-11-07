import { useQuery } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import CommunitiesHeader from './CommunitiesHeader'
import { SingleCommunityCard } from './SingleCommunityCard'





const CommunitiesPage = () => {
    const { data: communities, isLoading, isError, error } = useQuery({
        queryKey: ['communities'],
        queryFn: async () => {
            const res = await fetch('/api/communities');
            if (!res.ok) {
                throw new Error(`Ошибка: ${res.statusText}`);
            }
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            console.log("ALL_COMMUNITIES: ", data);
            return data;
        },
        onError: (error) => {
            console.log(error.message);
        }
    });

    if (isError) {
        return <p className='w-full mx-5 text-center block mt-[35vh] bg-[rgb(28,28,37)] rounded-xl h-fit py-6 text-slate-300'>Error: {error.message}</p>
    }

    const renderedCommunities = communities?.map(community => (
        <SingleCommunityCard key={community._id} {...community} />
    ));

    return (
        <div className='px-10 pt-10 w-full scroll-smooth h-[89vh] scrollbar-thumb-slate-800 scrollbar-thin scrollbar-track-transparent overflow-y-scroll'>
            <CommunitiesHeader />
            {
                isLoading ? 
                (
                    <span className="loading loading-ring loading-lg block mx-auto mt-[35vh]"></span>
                )
                : 
                (
                    renderedCommunities.length === 0 ?
                    <p className='w-full mx-5 text-center block mt-[35vh] bg-[rgb(28,28,37)] rounded-xl h-fit py-6 text-slate-300'>No communities found</p>
                    :
                    <div className='grid grid-cols-4 gap-4 mt-8'>
                        {renderedCommunities}
                    </div>
                )
            }
        </div>
    );
};
export default CommunitiesPage