import React from 'react'
import { CiSearch } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";

const Header = () => {
  return (
    <div className='w-full px-16 py-8 flex items-center justify-between bg-[rgb(28,28,37)] border-b-[1px] border-slate-800'>
        <h3 className='raleway-my tracking-widest text-3xl uppercase'>Lueur</h3>
        <label className="input input-bordered flex items-center gap-2 w-[500px] bg-[rgb(40,41,50)]">
            <input type="text" className="grow" placeholder="Search" />
            <CiSearch size={20}/>
        </label>
        <div className=' flex items-center gap-6'>
            <IoPersonAddOutline size={23}/>
            <AiOutlineMessage size={23}/>
            <IoIosNotificationsOutline size={23}/>
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <FaCaretDown />
        </div>
    </div>
  )
}

export default Header