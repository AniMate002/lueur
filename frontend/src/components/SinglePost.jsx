import React from 'react'
import { IoIosMenu } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoSendOutline } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FaHeart } from "react-icons/fa6";

const SinglePost = ({comments, createdAt, likes, user, text, _id}) => {
    const { data:authUser, isLoading } = useQuery({queryKey: ['authUser']})
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/posts/like/${_id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: ""
                })
                
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                
                console.log(data.message)
                queryClient.invalidateQueries({queryKey: ['authUser']})
                queryClient.invalidateQueries({queryKey: ['userProfile']})
                queryClient.invalidateQueries({queryKey: ['userPosts']})

                return data

            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })

    const handleLike = () => {
        mutate()
    }

  return (
    <div className='bg-[rgb(28,28,37)] mt-6 rounded-xl'>
        <div className='flex items-center gap-4 p-6 pb-0'>
            <div className="avatar">
                <div className="w-16 rounded-full">
                    <img src={user.profileImg} />
                </div>
            </div>
            <div>
                <p className='text-slate-300'>{user.fullname}</p>
                <p className='text-sm text-slate-400'>{(new Date(createdAt).toLocaleDateString())}</p>
            </div>
            <IoIosMenu size={24} className='ml-auto text-slate-400'/>
        </div>
        <p className='mt-6 text-sm text-slate-500 px-6 open-sans-my'>{text}</p>
        <div className='divider my-0 px-6 mt-6'></div>


        {/* BOTTOM POST MENU */}
        <div className='flex items-center w-full px-6 justify-center gap-8 mt-2'>
            <div className='flex items-center gap-4 text-slate-500'>
                <FaRegComment size={23}/>
                <p>{comments.length} Comments</p>
            </div>
            <div className='flex items-center gap-4 text-slate-500'>
                {
                    authUser.likedPosts.includes(_id.toString()) ?
                    <FaHeart onClick={handleLike} className='text-red-600 cursor-pointer'/>
                    :
                    <FaRegHeart onClick={handleLike} size={23} className={`hover:text-slate-300 cursor-pointer`}/>
                }
                <p>{likes.length} Likes</p>
            </div>
        </div>
        <div className='divider mt-2'></div>


        {/* COMMENT INPUT */}
        <div className='flex items-center w-full gap-2 px-6 pb-2'>
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <img src={user.profileImg} />
                </div>
            </div>
            <label className="input flex-grow input-bordered flex items-center gap-2 text-slate-300 bg-[rgb(40,41,50)] focus-within:outline-none border-none">
                <input type="text" className="grow focus:border-none focus:outline-none" placeholder="Write your comment..." />
                <IoSendOutline className='text-slate-400' size={20}/>
            </label>
        </div>
    </div>
  )
}

export default SinglePost