import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminCard from './AdminCard'
import FollowerCard from './FollowerCard'





const CommunityLeftSection = () => {
    const { data: communityProfile, isLoading } = useQuery({queryKey: ['communityProfile']})
    const navigate = useNavigate()
    if(isLoading){
        return <h3>LeftSection Loading</h3>
    }

    const renderedAdmins = communityProfile.admins.map(admin => <AdminCard key={admin._id} {...admin}/>)
    const renderedFollowers = communityProfile.followers.slice(0, 10).map(follower => <FollowerCard key={follower._id} {...follower}/>)

    return (
        <div className='w-[25%] shrink-0'>
            {/* ADMINS */}
            <div className='rounded-xl bg-[#1C1C25] w-full'>
                <p className='p-6 text-slate-300'>Admins</p>
                <div className='divider mt-[-10px]'></div>
                { renderedAdmins }
            </div>

            {/* FOLLOWERS */}
            <div className='rounded-xl bg-[#1C1C25] w-full mt-4 pb-4'>
                <p className='p-6 text-slate-300'>Followers</p>
                <div className='divider mt-[-10px]'></div>
                <div className='flex items-center justify-between flex-wrap px-5 gap-2'>
                    { renderedFollowers }
                </div>
            </div>
        </div>
    )
}

export default CommunityLeftSection