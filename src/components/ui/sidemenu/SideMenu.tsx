"use client";

import clsx from "clsx"
import { useSession } from "next-auth/react";
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"
import { SideMenuLink } from "./SideMenuLink";
import { useUIStore } from "@/store";
import { logOut } from "@/actions";


export const SideMenu = () => {
  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
  const closeSideMenu = useUIStore(state => state.closeSideMenu);

  const { data : session } = useSession();
  const isAuthenticated = !!session?.user;
  const isUserAdmin = (session?.user.role === "admin");

  const logOutEvent = async () => {
    await logOut();
    window.location.reload();
  }

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

            
            {!isAuthenticated && (
                <SideMenuLink href="/auth/login" icon={<IoLogInOutline size={30}/>} title="Sign In" onClick={closeSideMenu}/>
            )}

            {isAuthenticated && (
                <>
                    <SideMenuLink href="/profile" icon={<IoPersonOutline size={30}/>} title="Profile" onClick={closeSideMenu}/>
                    <SideMenuLink href="/orders" icon={<IoTicketOutline size={30}/>} title="Orders" onClick={closeSideMenu}/>
                    <button onClick={logOutEvent} className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                        <IoLogOutOutline size={30}/>
                        <span className="ml-3 text-xl">Log Out</span>
                    </button>
                </>
            )}

            {
                isUserAdmin && (
                    <>
                        <div className="w-full h-px bg-gray-200 my-10"/>
                        <SideMenuLink href="/admin/products" icon={<IoShirtOutline size={30}/>} title="Products" onClick={closeSideMenu}/>
                        <SideMenuLink href="/admin/orders" icon={<IoTicketOutline size={30}/>} title="Orders" onClick={closeSideMenu}/>
                        <SideMenuLink href="/admin/users" icon={<IoPeopleOutline size={30}/>} title="Users" onClick={closeSideMenu}/>
                    </>
                )
            }

        </nav>
    </div>
  )
}
