import { IoSendOutline } from "react-icons/io5";
import { RiImageAddLine } from "react-icons/ri";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from "react-hot-toast";

const CreatePost = () => {
  const [text, setText] = useState("")
  const queryClient = useQueryClient()
  const { data: userProfile, isLoading} = useQuery({queryKey: ['userProfile']})

  const { mutate, isPending } = useMutation({
    mutationFn: async ({text}) => {
      try {
        const res = await fetch('/api/posts/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({text})
        })

        const data = await res.json()
        if(data.error) throw new Error(data.error)
        
        console.log("CREATED_POST: ", data)
        queryClient.invalidateQueries({queryKey: ['authUser']})
        queryClient.invalidateQueries({queryKey: ['userProfile']})
        queryClient.invalidateQueries({queryKey: ['userPosts']})

        return data

      } catch (error) {
        console.log(error.message)
        toast.error(error.message)
        // throw new Error(error)
      }
    }
  })

  if(isLoading){
    return <div className="skeleton w-full h-[150px]"></div>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    mutate({text})
    setText('')
  }

  return (
    <div className=' rounded-xl bg-[rgb(28,28,37)] montserrat-my'>
      <div className='p-6  text-slate-300'>Post Something</div>
      <div className='divider mt-[-15px]'></div>
      <div className='flex items-center p-6 pt-0 gap-4 text-slate-300 w-full  '>
        <div className="avatar">
          <div className="w-14 rounded-full">
            <img src={userProfile.profileImg} />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <input value={text} onChange={e => setText(e.target.value)} type="text" placeholder="What is on your mind?" className="input w-[600px] bg-[rgb(28,28,37)] active:bg-[rgb(28,28,37)] focus:bg-[rgb(28,28,37)] focus:outline-none focus:border-none" />
        </form>
        <RiImageAddLine size={24} className="text-slate-500 hover:text-slate-300 cursor-pointer transition-all duration-150 ml-auto"/>
        <IoSendOutline onClick={handleSubmit} size={24} className="text-slate-500 hover:text-slate-300 cursor-pointer transition-all duration-150"/>
      </div>
    </div>
  )
}

export default CreatePost