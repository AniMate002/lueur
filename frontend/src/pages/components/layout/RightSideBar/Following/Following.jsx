import React from 'react'
import SingleFollowing from './SingleFollowing'
import { Link } from "react-router-dom"






const Following = ({following}) => {
    
const renderedFollowingUsers = following.slice(0, 6).map(user => <SingleFollowing {...user} key={user._id}/>)

  return (
    <>
      <p className='uppercase text-sm text-slate-400 ml-6 mt-8 tracking-widest montserrat-my '>following</p>
      <div className='flex flex-col gap-4 w-full mt-8'>
        {
          following.length === 0 ?
          <p className='ml-6 text-sm text-slate-500'>No followings</p>
          :
          renderedFollowingUsers
        }
      </div>
      {
        following.length > 5 ? 
        <Link to={'/'} className='text-blue-500 open-sans-my uppercase tracking-widest text-sm text-center w-full block hover:underline mt-4'>See more</Link>
        :
        ""
      }
    </>
  )
}

export default Following