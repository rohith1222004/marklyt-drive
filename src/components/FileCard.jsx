'use client'
import React from 'react'
import {
    Card,
    CardContent,
  } from "../components/ui/card"
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'
export default function FileCard({folderName, folderId }) {
  const router = useRouter();
  const handleDeleteFolder = () =>{
    console.log(folderId);
    axios.post(`/api/client/${folderId}`,
      {id : folderId,type : 'deleteFolder'},
      {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) =>{
      console.log(res);
    })
 }
  return (
    <div>
    <Card className='w-56 h-56 '>
    <CardContent>
        <div className='flex flex-col'>
            <Image onClick={() =>router.push(`/dashboard/${folderId}`)} className='mt-5' src={'/folder.png'} width={50} height={50} alt='folder'/>
            <div>
                <h1 className='font-bold mt-5'>{folderName}</h1>
                <p className='text-gray-500 text-sm'>5 Files</p>
            </div>
        </div>  
    </CardContent>
  <button onClick={handleDeleteFolder}>
      <Image  className='ml-5' src={'/delete.png'} width={24} height={24} />
  </button>
</Card>
</div>
  )
}
