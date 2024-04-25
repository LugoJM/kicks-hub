import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
  return (
    <div className='flex w-full justify-center text-xs mb-10'>
        <Link href={'/'}>
            <span className={`${titleFont.className} antialiased font-bold`}>Kicks </span>
            <span>| Hub</span>
            <span>© {new Date().getUTCFullYear()}</span>
        </Link>
        
        <Link href={ '/#' } className='mx-3'>
            Privacy and Legal
        </Link>
        
        <Link href={ '/#' } className='mx-3 flex items-center justify-center'>
            Stores
        </Link>
    </div>
  )
}
