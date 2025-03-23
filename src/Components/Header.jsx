import React from 'react'
import { NavLink } from "react-router";
import { CiShoppingCart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from 'react-router';
import useDarkMode from "../Hook/useDarkMode";

function Header() {

    const navigate = useNavigate()
    const [isDark, setIsDark] = useDarkMode()

  return (
    <div className='sticky z-30 top-0 duration-500 w-full dark:bg-light-primary bg-gray-900 h-24 border-b border-gray-400/30'>
        <div className='relative w-full  flex flex-row-reverse items-center gap-3 p-3'>
            {/* Profile Section*/}
            <div className='duration-500 flex items-center p-1 gap-2 w-fit h-fit rounded-full dark:bg-light-tertiary bg-gray-800'>
                <img className='w-10 h-10 rounded-full p-1 bg-slate-600' src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmUlMjBhaXxlbnwwfHwwfHx8MA%3D%3D"></img>
                <label className='text-white dark:text-light-six font-bold mr-2'>mayank</label>
            </div>

            {/* Buy Section*/}
            <div className='p-3 duration-500 bg-slate-800 flex dark:text-light-six dark:bg-light-tertiary text-white gap-2 items-center rounded-full cursor-pointer' onClick={() => navigate("/cart")}>
                <CiShoppingCart className='text-xl'/>
                <p>Cart</p>
            </div>

             {/* Buy Section*/}
            <div className='p-3 text-xl duration-500 bg-slate-800 flex text-white gap-2  dark:text-light-six dark:bg-light-tertiary items-center rounded-full' onClick={() => setIsDark(!isDark)}>
                {/* conditionn aegi ki agar dark hai to dark wala logo btao aisa  */}
                <MdOutlineDarkMode />
                {/* <MdOutlineLightMode /> */}
            </div>

            {/* Search Section */}
            <div tabIndex={0} className='bg-slate-800 duration-500 rounded-full p-2 mr-28 flex focus-within:ring-2 dark:bg-light-tertiary dark:focus-within:ring-light-six  focus-within:ring-violet-300'>
                <input placeholder='Search' className='w-[24rem] duration-500  dark:bg-light-tertiary focus:ring-0 outline-none rounded-full bg-slate-800'/>
                <button className='p-2 text-white duration-500 bg-purple-300  dark:bg-light-six rounded-full '><CiSearch /></button>
            </div> 

            {/* Img Section*/}
            <div className='absolute left-1 mt-3 duration-500 flex h-[20rem]  w-[20rem]'>
                <img src="/logo.png" alt="Shoplicity Logo" className='invert'/>
            </div>
        </div> 
    </div>
  )
}

export default Header