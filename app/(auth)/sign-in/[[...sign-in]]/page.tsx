import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='bg-black w-full h-full p-56 items-center justify-center flex flex-1'>
      <SignIn />
    </div>
  )
}