'use client'
import React from 'react'
import {
    Card,
    CardContent,
  } from "@/components/ui/card"
import { FolderIcon } from 'lucide-react'
import Image from 'next/image'


export default function FileCard({folderName}) {
  return (
    <div>
    <Card className='w-56 h-56 '>
    <CardContent>
        <div className='flex flex-col'>
            {/* <FolderIcon className="h-8 w-8 mt-5" /> */}
            <Image className='mt-5' src={'/folder.png'} width={50} height={50} alt='folder'/>
            <div>
                <h1 className='font-bold mt-5'>{folderName}</h1>
                <p className='text-gray-500 text-sm'>5 Files</p>
            </div>
        </div>
     
    </CardContent>
</Card>
</div>
  )
}
