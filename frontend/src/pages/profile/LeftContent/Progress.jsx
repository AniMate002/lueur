


import { useQuery } from '@tanstack/react-query'
import React from 'react'

const Progress = () => {
  const { isLoading } = useQuery({queryKey: ['userProfile']})
  if(isLoading){
    return <div className='skeleton rounded-xl w-full h-[100px]'></div>
  }
  return (
    <div className='bg-[rgb(28,28,37)] p-6 montserrat-my rounded-xl'>
        <p className='text-slate-300'>Complete your profile</p>
        <div className='flex items-center gap-10 mt-6 w-full'>
            <progress className="progress progress-accent w-full" value="70" max="100"></progress>
            <p className='text-slate-300'>75%</p>
        </div>
    </div>
  )
}

export default Progress