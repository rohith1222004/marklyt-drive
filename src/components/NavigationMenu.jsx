import React from 'react';
import { Button } from "@/components/ui/button";
import { BellIcon, DownloadIcon, FileIcon, HomeIcon, Castle, LogOut  } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';

export default function NavigationMenu() {
  return (
    <div className="block justify-center items-center">
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r lg:block dark:bg-gray-800/40">
          <div className="flex h-full flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <Link className="flex items-center gap-2 font-semibold" href="#">
                <Image src={'/letter-m.png'} width={40} height={50} alt='M'/>
                <span className="">Maklyt</span>
              </Link>
              <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
                <BellIcon className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium space-y-3">
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <HomeIcon className="h-4 w-4" />
                  Browse Bucket
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg bg-blue-600 px-3 py-2 text-white transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                  href="#"
                >
                  <FileIcon className="h-4 w-4" />
                  File Details
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <Castle className="h-4 w-4" />
                  Clients
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Download
                </Link>

                <Link
                  className="flex items-center gap-3 rounded-lg px-3  text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <LogOut className="h-4 w-4" />
                  Profile
                </Link>
              </nav>
            
              <div className='mt-96 flex items-center justify-center '>
                <Button className='w-40 space-x-3'>
                  <LogOut className='h-4 w-4'/>
                  <h1>LogOut</h1>
                  </Button>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
