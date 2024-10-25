import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import Logo from "../../../public/logo.png"


const ProfilePage = () => {
    const { username } = useParams()
    const { data: userProfile, isLoading } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            try {
                const res = await fetch(`/api/users/profile/${username}`)
                const data = await res.json()
                if(data.error) throw new Error(data.error)

                console.log("userProfile: ", data)

                return data

            } catch (error) {
                console.log(error.message)
                throw new Error(error)
            }
        }
    })
    // const {data: authUser} = useQuery({queryKey: ['authUser']})

    if(isLoading){
        return (
          <div className='w-[100vw] h-[100vh] bg-black flex items-center justify-center flex-col'>
            <img src={Logo} alt="logo" className='w-[400px]'/>
            <span className="loading loading-ring loading-lg"></span>
          </div>
        )
      }

  return (
    <div className=''>ProfilePage: {userProfile.username} </div>
  )
}

export default ProfilePage