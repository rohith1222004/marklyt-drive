"use client"
import React, { useState } from 'react'
import {
    Card,
    CardContent,
  } from "../components/ui/card"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function DataCard({folderName, folderId}) {

  const[url ,setUrl] = useState()

  const handleFileGet = async() =>{

    const urlRes = await axios.post(`/api/client/${folderId}`,{
      id : folderId, type : 'getFile'
    },{
      headers:{
        "Content-Type": "application/json"
      }}
    )
    console.log(urlRes.data);
    window.open(urlRes.data);
  }
  return (
    <div>
    <Card className='w-56 h-56 '>
    <CardContent>
        <div className='flex flex-col'>
           
              <Image onClick={handleFileGet} className='mt-5' src={'/video-play-64.ico'} width={50} height={50} alt='folder'/>


            <div>
                <h1 className='font-bold mt-5'>{folderName}</h1>
                <p className='text-gray-500 text-sm'>5 Files</p>
            </div>
        </div>
      {/* <Button onClick={() => {console.log(folderId)}}>delete</Button> */}
    </CardContent>
</Card>
</div>
  )
}
