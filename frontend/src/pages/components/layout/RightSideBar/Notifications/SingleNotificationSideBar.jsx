import React from 'react'
import { GoDotFill, GoDot } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";


const SingleNotificationSideBar = ({type, from, read}) => {
    const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/profile/${from.username}`)} className='flex items-center px-6 gap-2 cursor-pointer '>
            <div className="avatar">
                <div className="w-10 rounded-full">
                    <img src={from.profileImg} alt='avatar' />
                </div>
            </div>
            <div className='w-[120px] overflow-hidden'>
                <p className={`text-sm ${read ? "text-slate-500" : "text-blue-400"} montserrat-my overflow-ellipsis`}>{from.fullname}</p>
                <p className='text-slate-500 text-sm montserrat-my'>
                    {
                        type === "like" ? 
                        "Liked your post"
                        :
                        type === "follow" ? 
                        "Follows you"
                        :
                        "Shared post"
                    }
                </p>
            </div>
            {
                read ? 
                <GoDot className='text-slate-400 ml-auto'/>
                :
                <GoDotFill className='text-blue-400 ml-auto'/>
            }
        </div>
  )
}

export default SingleNotificationSideBar