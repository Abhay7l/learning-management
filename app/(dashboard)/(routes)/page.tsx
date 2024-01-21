import { UserButton } from "@clerk/nextjs"
import { User } from "lucide-react"

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/"/>
    {/* <p className='text-3xl text-sky-500'>This is a protected page</p> */}
    </div>
  )
}
