import React from 'react'
import { NavLink } from 'react-router-dom'
import { BsPeople } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { TbTemplate } from "react-icons/tb";
import { CiImageOn } from "react-icons/ci";
import { PiScroll } from "react-icons/pi";


const Menu = () => {
  return (
    <div className='mt-10 flex flex-col gap-10'>
        <NavLink to={'/feed'} className={"flex items-center gap-6 text-md font-bold montserrat-my text-slate-300"}>
            <TbTemplate  size={30}/>
            <span>Feed</span>
        </NavLink>
        
        <NavLink to={'/friends'} className={"flex items-center gap-6 text-md font-bold montserrat-my text-slate-300"}>
            <BsPeople  size={30}/>
            <span>Friends</span>
        </NavLink>
        
        <NavLink to={'/events'} className={"flex items-center gap-6 text-md font-bold montserrat-my text-slate-300"}>
            <CiCalendar size={35}/>
            <span>Events</span>
        </NavLink>

        <NavLink to={'/photos'} className={"flex items-center gap-6 text-md font-bold montserrat-my text-slate-300"}>
            <CiImageOn size={35}/>
            <span>Photos</span>
        </NavLink>

        <NavLink to={'/files'} className={"flex items-center gap-6 text-md font-bold montserrat-my text-slate-300"}>
            <PiScroll size={35}/>
            <span>Files</span>
        </NavLink>
    </div>
  )
}

export default Menu