"use client"

import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'

const Sidebar = () => { 
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-72 bg-gradient-to-b from-[#151F8C] to-[#728AE9] p-5 shadow-md shadow-slate-200/50 lg:flex">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 md:py-2">
          <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} />
        </Link>

        <nav className="h-full flex-col justify-between md:flex md:gap-4">
          <SignedIn>
            <ul className="hidden w-full flex-col items-start gap-2 md:flex">
              {navLinks.map((link) => {
                const isActive = link.route === pathname

                return (
                  <li key={link.route} className={`flex-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover  transition-all hover:bg-purple-100 hover:shadow-inner group ${
                    isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                  }`}>
                    <Link className="p-16-semibold flex size-full gap-4 p-4" href={link.route}>
                      <Image 
                        src="/logo.svg"
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive && 'brightness-200'}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
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