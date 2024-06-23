'use client'
import { Import, SearchIcon, SquirrelIcon } from 'lucide-react'
import React from 'react'
import { Input } from './ui/input';
import Link from 'next/link';
import { CirclePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UserButton , auth, useAuth} from '@clerk/nextjs';





export default function TopBar() {
  const router = useRouter();
  const {userId} = useAuth()

  return (
    <div className="flex h-14 lg:h-[60px] items-center gap-4 border-b  px-6 dark:bg-gray-800/40 justify-between">
      <Link className="lg:hidden" href="#">
        <SquirrelIcon className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
            {/* <AddClientButton/> */}
        <form className='flex justify-end  items-center space-x-16'>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full bg-blue-50 shadow-none appearance-none pl-8  dark:bg-gray-950"
              placeholder="Search files..."
              type="search"
            />
          </div>
          <div className='cursor-pointer' onClick={() => router.push('/addClient')}>
            <CirclePlus size={25} />
          </div>  
        </form>
        {
          userId?(
            <UserButton/>
          ):null
        }
      </div>
  )
}
