import { useQuery } from '@tanstack/react-query'
import React from 'react'


const MiniProfile = () => {
    const { data: authUser, isLoading } = useQuery({queryKey: ['authUser']})
  return (
    <div className='border-[1px] border-slate-600 bg-[rgb(40,41,50)] px-2 py-4 rounded-xl flex items-center gap-3 w-full mt-4'>
        <div className="avatar">
            <div className="w-10 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
        </div>
        <div>
            <p className='text-sm montserrat-my'>{authUser.fullname}</p>
            <p className='text-slate-500  text-[12px]'>@{authUser.username}</p>
        </div>
    </div>
  )
}

export default MiniProfile