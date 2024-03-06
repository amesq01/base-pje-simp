'use client'
import Link from "next/link"

import { usePathname } from "next/navigation"
import PendingCont from "./pendingdCount";


export const Nav = () => {

  const router = usePathname();
  

  return(
    <nav className="  flex justify-between items-center gap-[1px] text-white font-medium">
      <div className={`flex w-full justify-center p-2 rounded-b-md ${router ==='/' ? 'bg-blue-500 text-white':'bg-slate-200 text-black'}`}>
        <Link className="text-xs" href={'/'}  >
        <PendingCont/>
          </Link>
      </div>
      <div className={`flex w-full justify-center p-2 rounded-b-md ${router ==='/processes-manifested' ? 'bg-blue-500 text-white':'bg-slate-200 text-black'}`}>
      <Link className="text-xs" href={'/processes-manifested'}  >
      <PendingCont/>
      </Link>
      </div>
      <div className={`flex w-full justify-center p-2 rounded-b-md ${router ==='/processes-archived' ? 'bg-blue-500 text-white':'bg-slate-200 text-black'}`}>
      <Link className="text-xs" href={'/processes-archived'}>
       <PendingCont/>
      </Link>
      </div>
    </nav>
  )
}
