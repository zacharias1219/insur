"use client"

import { userNavLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { User } from 'lucide-react'

const Sidebar = () => { 
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-72 bg-gradient-to-b from-[#151F8C] to-[#728AE9] p-5 shadow-md shadow-slate-200/50 lg:flex">
      <div className="flex size-full flex-col gap-4">
        <div className='flex flex-row gap-4 items-center'>
          <Link href="/" className="flex items-center gap-2 md:py-2">
            <Image src="/logo.svg" alt="logo" width={32} height={32} />
          </Link>
          <h1 className='text-white text-3xl font-bold'>Insur</h1>     
        </div>

        <nav className="h-full flex-col justify-between md:flex md:gap-4">
          <SignedIn>
            <ul className="hidden w-full flex-col items-start gap-2 md:flex">
              {userNavLinks.map((link) => {
                const isActive = link.route === pathname

                return (
                  <li key={link.route} className={`flex-center pt-1 font-semibold w-full whitespace-nowrap rounded-full bg-cover  transition-all  hover:shadow-inner group ${
                    isActive ? 'bg-black text-white hover:bg-slate-900/80' : 'text-black bg-slate-300/30 hover:bg-slate-300/80'
                  }`}>
                    <Link className="p-16-semibold flex size-full gap-4 p-4" href={link.route}>
                      <Image 
                        src="/logo.svg"
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive && 'brightness-200'}`}
                      />
                      <div className='pt-1'>{link.label}</div>
                    </Link>
                  </li>
                  
                )
              })}
              <div className='pl-4 pt-36 flex flex-row items-center justify-between gap-4'>
                <UserButton afterSignOutUrl='/'/>
                <p className='text-xl font-bold'>User</p>
              </div>
              </ul>
            <ul className="flex-col items-start gap-2 md:hidden">
              <li className="flex-center cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl='/' showName />
              </li>
            </ul>
          </SignedIn>

          <SignedOut>
            <Button asChild className="py-4 px-6 flex-center gap-3 text-md font-bold rounded-full p-16-semibold focus-visible:ring-offset-0 focus-visible:ring-transparent bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar