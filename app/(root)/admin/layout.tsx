import MobileNav from '@/components/user/MobileNav'
import Sidebar from '@/components/admin/Sidebar'
import { Toaster } from '@/components/ui/toaster'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root bg-black flex flex-row">
      <Sidebar />
      {/* <MobileNav /> */}

      <div className="p-20 root-container"> 
        <div className="wrapper text-white">
          {children}
        </div>
      </div>
      
      {/* <Toaster /> */}
    </main>
  )
}

export default Layout