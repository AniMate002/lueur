import { useQuery } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import SingleNotificationSideBar from './SingleNotificationSideBar'

const Notifications = () => {
    const { data: notifications, isLoading, isError, error } = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            try {
                const res = await fetch('/api/notifications')
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                console.log("NOTIFICATIONS: ", data)
                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })

    if(isError){
        return <h3>{error}</h3>
    }

    if(isLoading){
        return <h3>Loading Notifications</h3>
    }


    const renderedNotifications = notifications?.map(notification => <SingleNotificationSideBar {...notification} key={notification._id}/>)

    return (
        <>
            <p className='uppercase text-sm text-slate-400 ml-6 mt-8 tracking-widest montserrat-my '>notifications</p>
            <div className='flex flex-col gap-4 w-full mt-8'>
                {
                    notifications.length === 0 ? 
                    <p className='ml-6 text-sm text-slate-500'>No notifications</p>
                    :
                    renderedNotifications
                }
            </div>
        </>
    )
}

export default Notifications