import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from 'react-router-dom'




const CommunityLeftSection = () => {
    const { data: communityProfile, isLoading } = useQuery({queryKey: ['communityProfile']})
    const navigate = useNavigate()
    if(isLoading){
        return <h3>LeftSection Loading</h3>
    }
    return (
        <div className='w-[25%] shrink-0'>
            <div className='rounded-xl bg-[#1C1C25] w-full'>
                <p className='p-6 text-slate-300'>Admins</p>
                <div className='divider mt-[-10px]'></div>
                {
                    communityProfile.admins.map(admin => {
                        return (
                            <div key={admin._id} onClick={() => navigate(`/profile/${admin.username}`)} className='flex items-center gap-2 px-6 pb-4 cursor-pointer'>
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src={admin.profileImg} alt='profileimg' />
                                    </div>
                                </div>
                                <div>
                                    <p className='text-sm text-slate-300'>{admin.fullname}</p>
                                    <p className='text-slate-500 text-[12px]'>@{admin.username}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CommunityLeftSection