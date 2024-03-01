import Link from "next/link"

export const Nav = () => {
  return(
    <nav className="  flex justify-between items-center gap-[1px]">
      <div className="bg-[#4582f6] flex w-full justify-center p-2 rounded-b-md   ">
        <Link className="text-xs" href={'/'}  >PENDENTES (10)</Link>
      </div>
      <div className="bg-slate-400 flex w-full justify-center p-2 rounded-b-md">
      <Link className="text-xs" href={'/'}  >MANIFESTADOS (10)</Link>
      </div>
      <div className="bg-slate-400 flex w-full justify-center p-2 rounded-b-md">
      <Link className="text-xs" href={'/'}  >ARQUIVADOS (10)</Link>
      </div>
    </nav>
  )
}
