import React from 'react'




const SingleRepostUser = ({ profileImg, username, fullname, selectedRepostUser, setSelectedRepostUser, _id}) => {
    return (
        <button onClick={() => setSelectedRepostUser(_id)} className={`w-[120px] rounded-xl text-center mt-2 py-2  ${selectedRepostUser.toString() === _id.toString() ? "bg-slate-800" : "bg-none hover:bg-[rgb(50,51,63)]"}`}>
            <div className="avatar">
                <div className="w-16 rounded-full">
                    <img src={profileImg} />
                </div>
            </div>
            <div>
                <p className='text-sm w-full overflow-ellipsis overflow-hidden'>{fullname}</p>
                <p className='text-[12px] text-slate-500 overflow-ellipsis overflow-hidden'>@{username}</p>
            </div>
        </button>
    )
}

export default SingleRepostUser