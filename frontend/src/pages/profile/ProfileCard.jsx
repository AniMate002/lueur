


import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

const ProfileCard = ({isMyPage}) => {
    // const { username } = useParams()
    const queryClient = useQueryClient()
    const { data: authUser, isLoading: authIsLoading} = useQuery({queryKey: ['authUser']})
    const { data:userProfile, isLoading } = useQuery({queryKey: ['userProfile']})
    const { data:userPosts, postsIsLoading } = useQuery({queryKey: ['userPosts']})

    const { mutate } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/users/follow/${userProfile._id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: ""
                })

                const data = await res.json()

                if(data.error) throw new Error(data.error)
                console.log("FOLLOW_UNFOLLOW: ", data)
                
                queryClient.invalidateQueries({queryKey: ['authUser']})
                queryClient.invalidateQueries({queryKey: ['userProfile']})
                // queryClient.invalidateQueries({queryKey: ['notifications']})

                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })

    const handleFollow = () => {
        // alert(username)
        mutate()
    }

  return (
    <div className='rounded-xl overflow-hidden w-full bg-[rgb(28,28,37)]'>
        <div className='h-[350px] overflow-hidden flex items-center justify-center'>
            {
                isLoading ?
                ""
                :
                <img className='bg-[rgb(28,28,37)]' src={'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt="coverimg" />
            }
        </div>
        
        <div className='flex items-center justify-end relative'>
            
            <div className='flex items-center gap-10 absolute left-[56px] top-[-150px]'>
                {
                    isLoading ?
                    <div className='skeleton w-48 h-48 block rounded-full'></div>
                    :
                    <div className="avatar">
                        <div className="w-48 rounded-full">
                            <img src={isLoading ? "" : userProfile.profileImg} />
                        </div>
                    </div>
                }

                {
                    isLoading ? 
                    <div>
                      <p className='skeleton h-8 w-44'></p>  
                      <p className='skeleton h-4 w-16 mt-4'></p>  
                    </div>
                    :
                    <div>
                        <p className='montserrat-my tracking-widest font-bold text-3xl'>{userProfile?.fullname}</p>
                        <p className='text-slate-500'>@{userProfile?.username}</p>
                    </div>
                }
            </div>

            {
                isLoading ? 
                <div className='skeleton w-72 h-16 mr-32 my-4'></div>
                :
                <div className='flex items-center gap-6 mr-32 py-4'>
                    {
                        !isMyPage ? 
                        <button onClick={handleFollow} className={` ${ authUser.following.some(user => user._id.toString() === userProfile._id.toString()) ? " border-2 border-[rgb(0,119,254)] text-slate-300" : " bg-[rgb(0,119,254)]"} rounded-xl px-6 py-2`}>
                        {
                            authUser.following.some(user => user._id.toString() === userProfile._id.toString()) ?
                            "Unfollow"
                            :
                            "Follow"
                        }
                        </button>
                        :
                        <button className='bg-[rgb(0,119,254)] rounded-xl px-6 py-2'>Edit profile</button>
                    }
                    <div className='flex items-center justify-center flex-col gap-2 '>
                        <p className='font-light text-slate-400'>Posts</p>
                        <p className='text-lg'>{userPosts?.length || "0"}</p>
                    </div>
                    <div className='flex items-center justify-center flex-col gap-2 '>
                        <p className='font-light text-slate-400'>Followers</p>
                        <p className='text-lg'>{userProfile?.followers.length}</p>
                    </div>
                    <div className='flex items-center justify-center flex-col gap-2 '>
                        <p className='font-light text-slate-400'>Following</p>
                        <p className='text-lg'>{userProfile?.following.length}</p>
                    </div>
                    <div className='flex items-center justify-center flex-col gap-2 '>
                        <p className='font-light text-slate-400'>Liked</p>
                        <p className='text-lg'>{userProfile?.likedPosts.length}</p>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default ProfileCard