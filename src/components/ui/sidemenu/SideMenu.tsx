'use client';

import clsx from 'clsx'
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"
import { SideMenuLink } from "./SideMenuLink";
import { useUIStore } from "@/store";


export const SideMenu = () => {
  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
  const closeSideMenu = useUIStore(state => state.closeSideMenu);

  return (
    <div >

        {
            isSideMenuOpen && (
                <>
                    <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"/>
                    <div onClick={closeSideMenu} className="fade-in fixed top-0 left-0 w-screen z-10 h-screen backdrop-filter backdrop-blur-sm"/>
                </>
            )
        }

        <nav 
            className={
                clsx(
                    "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                    {
                        "translate-x-full" : !isSideMenuOpen
                    }
                )
            }>
                
            <IoCloseOutline 
                size={50} 
                className="absolute top-5 right-5 cursor-pointer" 
                onClick={closeSideMenu}/>

            <div className="relative mt-14">
                <IoSearchOutline size={20} className="absolute top-2 left-2"/>
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500" />
            </div>

            <SideMenuLink href="/" icon={<IoPersonOutline size={30}/>} title="Profile"/>
            <SideMenuLink href="/orders" icon={<IoTicketOutline size={30}/>} title="Orders"/>
            <SideMenuLink href="/auth/login" icon={<IoLogInOutline size={30}/>} title="Sign In"/>
            <SideMenuLink href="/auth/login" icon={<IoLogOutOutline size={30}/>} title="Log Out"/>

            <div className="w-full h-px bg-gray-200 my-10"/>

            <SideMenuLink href="/admin/products" icon={<IoShirtOutline size={30}/>} title="Products"/>
            <SideMenuLink href="/admin/orders" icon={<IoTicketOutline size={30}/>} title="Orders"/>
            <SideMenuLink href="/admin/users" icon={<IoPeopleOutline size={30}/>} title="Users"/>


        </nav>
    </div>
  )
}
