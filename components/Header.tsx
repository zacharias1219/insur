import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='border bg-black border-black'>
        <div className='flex flex-row text-white justify-between px-4'>
          <Link href="/">
            <section className='flex justify-between items-center gap-4 p-4'>
                <Image src='/logo.svg' width={30} height={30} alt='logo' className='object-contain'/>
                <div className='text-3xl font-bold'>Insur</div>
            </section>
          </Link>
            <section className='flex justify-between gap-6 items-center p-4'>
                <Link href="/#"><div className='text-xl font-bold'>About</div></Link>
                <Link href="/#"><div className='text-xl font-bold'>Contact</div></Link>
                <Link href="/#"><div className='text-xl font-bold'>Blogs</div></Link>
            </section>
        </div>
    </header>
  )
}

export default Header