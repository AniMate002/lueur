import React from 'react'



const SingleComment = ({text, user, _id, createdAt}) => {
    return (
        <div className=' px-4 mx-2 pb-4 flex  items-center pt-4 hover:bg-slate-800 rounded-xl mb-1'>
            <div className="avatar">
                <div className="w-10 rounded-full">
                    <img src={user.profileImg} />
                </div>
            </div>
            <div className='ml-4'>
                <p className='text-sm text-slate-300'>{user.fullname}</p>
                <p className='text-[12px] text-slate-500'>@{user.username}</p>
            </div>
            <p className='text-slate-300 text-sm ml-10 px-6 py-2 bg-[rgb(40,41,50)] rounded-full'>{text}</p>
        </div>
    )
}

export default SingleComment