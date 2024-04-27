'use client';

import { titleFont } from "@/config/fonts"
import {IoSearchOutline, IoCartOutline} from 'react-icons/io5'
import Link from "next/link"
import { useCartStore, useUIStore } from "@/store"
import { useEffect, useState } from "react";


export const TopBar = () => {
  const openSideMenu = useUIStore(state => state.openSideMenu);
  const cartItemsCount = useCartStore(state => state.getCartItems());

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  },[])
  
  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>Kicks</span>
          <span> | Hub</span>
        </Link>  
      </div>

      <div className="hidden sm:block">
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/men">Mens</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women">Womens</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/kid">Kids</Link>
      </div>

      <div className="flex items-center">

        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5"/>
        </Link>

        <Link href={(cartItemsCount === 0 && loading) ? "/empty" : "/cart"} className="mx-2">
          <div className="relative">
            {
              (loading && cartItemsCount > 0) && (
                <span className="absolute text-xs rounded-full px-1 -top-2 -right-2 bg-blue-700 text-white fade-in">{cartItemsCount}</span>
              )
            }
            <IoCartOutline className="w-5 h-5"/>
          </div>
        </Link>

        <button 
          onClick={openSideMenu}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray">Menu</button>
      </div>
    </nav>
  )
}
