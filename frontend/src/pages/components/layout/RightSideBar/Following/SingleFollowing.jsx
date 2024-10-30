import React from 'react'
import { useNavigate } from 'react-router-dom'




const SingleFollowing = ({username, profileImg, fullname}) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/profile/${username}`)} className='flex items-center px-6 gap-2 cursor-pointer hover:underline'>
            <div className="avatar">
                <div className="w-10 rounded-full">
                    <img src={profileImg} alt='avatar' />
                </div>
            </div>
            <p className='text-sm text-slate-400 montserrat-my'>{fullname}</p>
        </div>
    )
}

export default SingleFollowing