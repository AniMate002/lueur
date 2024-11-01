import React, { useEffect, useState } from 'react'
import FollowingHeader from './FollowingHeader'
import FollowingCards from './FollowingCards'





const FollowingPage = () => {
    // alphasc, alphdesc,folldesc, follasc, default
    const [sortType, setSortType] = useState("default")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        // alert(sortType)
        console.log("SORT_TYPE: ", sortType)
    }, [sortType])


    return (
        <div className='px-10 pt-10 w-full scroll-smooth h-[89vh] scrollbar-thumb-slate-800 scrollbar-thin scrollbar-track-transparent overflow-y-scroll'>
            <FollowingHeader setSortType={setSortType} sortType={sortType} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <FollowingCards sortType={sortType} searchQuery={searchQuery}/>
        </div>
    )
}

export default FollowingPage