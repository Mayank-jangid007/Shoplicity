import React from 'react'
import { GoHome } from "react-icons/go";
import { CiShoppingCart } from "react-icons/ci";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";
import { NavLink } from 'react-router';

function NavBar() {

  const menuItems = [
    { to: "/", label: "Home", icon: <GoHome /> },
    { to: "/wishlist", label: "Wish List", icon: <GrFavorite /> },
    { to: "/shop", label: "Shop", icon: <CiShoppingCart /> },
    { to: "/ContactUs", label: "Contact Us", icon: <MdOutlinePermContactCalendar /> },
  ];

  const handleNav = (e) =>{
    
  }

  return (
    <div className="fixed top-48 left-2 rounded-2xl w-fit flex flex-col gap-2 z-20">
      {/* Parent container with `group` */}
      <div className="group w-auto relative flex flex-col items-center">
        {/* First Menu */}
        {/* <ul className="flex flex-col items-center justify-center p-6 gap-8 w-14 bg-dark-secoundary rounded-2xl opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000 ease-in"> */}
        <ul className="flex flex-col items-center justify-center p-6 gap-8 w-14 bg-dark-secondary dark:bg-light-six rounded-2xl opacity-30 group-hover:opacity-100 transition-all duration-900 ease-in">
          <li className="p-2 text-[25px] w-fit hover:bg-dark-tertiary rounded-2xl text-white dark:text-light-primary gap-2"><GoHome /></li>
          <li className="p-2 text-[25px] w-fit hover:bg-dark-tertiary rounded-2xl text-white dark:text-light-primary gap-2"><GrFavorite /></li>
          <li className="p-2 text-[25px] w-fit hover:bg-dark-tertiary rounded-2xl text-white dark:text-light-primary gap-2"><CiShoppingCart /></li>
          <li className="p-2 text-[25px] w-fit hover:bg-dark-tertiary rounded-2xl text-white dark:text-light-primary gap-2"><MdOutlinePermContactCalendar /></li>
        </ul>

        {/* Second Menu */}
        {/* <ul className="absolute top-0 left-6 w-[190px] h-full opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:left-16 p-5 flex flex-col gap-7 justify-center bg-gray-800/30 backdrop-blur-2xl rounded-2xl transition-all duration-400 ease-in-out">
          <NavLink className="p-2 text-[20px] w-full hover:bg-tertiary rounded-2xl text-white flex items-center gap-2"><GoHome />Home</NavLink>
          <NavLink className="p-2 text-[20px] w-full hover:bg-tertiary rounded-2xl text-white flex items-center gap-2"><GrFavorite />Wish List</NavLink>
          <NavLink className="p-2 text-[20px] w-full hover:bg-tertiary rounded-2xl text-white flex items-center gap-2"><CiShoppingCart />Shop</NavLink>
          <NavLink className="p-2 text-[20px] w-full hover:bg-tertiary rounded-2xl text-white flex items-center gap-2"><MdOutlinePermContactCalendar />Contact Us</NavLink>
        </ul> */}

        <ul className="absolute top-0 left-6 w-[190px] h-full opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:left-16 p-5 flex flex-col gap-7 justify-center bg-gray-800/30  backdrop-blur-2xl rounded-2xl transition-all duration-400 ease-in-out">
        {menuItems.map((data, index) => (
          <NavLink key={index} to={data.to} className={({isActive}) => `p-2 text-[20px] w-full ${isActive? "bg-dark-tertiary dark:bg-light-tertiary" : ""} hover:bg-tertiary rounded-2xl text-white dark:text-light-six flex items-center gap-2`}>{data.icon}{data.label}</NavLink>
        ))}
          
        </ul>



      </div>
    </div>
    
  )
}

export default NavBar