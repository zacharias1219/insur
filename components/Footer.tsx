import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer>
        <div className='flex flex-row bg-[#222222] text-white justify-between px-6'>
            <section className='flex justify-between gap-6 items-center p-4'>
                <div className='text-md font-bold'>©2024 Zach</div>
            </section>
            <section className='flex justify-between text-sm font-bold items-center gap-4 p-4'>
                <Link href="/#"><div>Instagram</div></Link>
                <Link href="/#"><div>Linkedin</div></Link>
                <Link href="/#"><div>Email</div></Link>
            </section>    
        </div>
    </footer>
  )
}

export default Footer