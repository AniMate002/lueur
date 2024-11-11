import { useQuery } from '@tanstack/react-query'
import React from 'react'
import SingleUserCard from './SingleUserCard'



const UsersCards = () => {
    
    const { data: users, isLoading } = useQuery({queryKey: ['users']})
    const { data: authUser } = useQuery({queryKey: ['authUser']})

    if(isLoading){
        return <h3>Loading</h3>
    }

    const renderedUsersCards = users.filter(user => user._id.toString() !== authUser._id.toString()).map(user => <SingleUserCard key={user._id} {...user}/>)

    return (
        <div className='grid grid-cols-4 gap-4 mt-8'>{renderedUsersCards}</div>
    )
}

export default UsersCards