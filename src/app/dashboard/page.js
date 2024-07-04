"use client"
import axios from 'axios'
import React, { useState , useEffect} from 'react'
import {useRouter } from "next/navigation";
import { Button } from '@nextui-org/button';
import Lottie from "lottie-react";
import loadingAnimation from "../../lottie/loading.json"
import { createClient, getClients } from '../../helper/frontend/page';
import {ScrollArea} from "../../components/ui/scroll-area"
import { Input } from '../../components/ui/input';
import FileCard from '../../components/FileCard';


export default function page() {
    const router = useRouter();
    const [clients, setClients] = useState([])
    const [inputValue, setInputValue] = useState('');
    const [refresh , setRefresh] = useState(false)
    const [loading, setLoading] = useState(true)

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

      
    const handleCreateFolder = async () => {
        setLoading(true)
        await createClient(inputValue)
        setRefresh(true)
        setLoading(false)
    }

    useEffect(() => {
        axios.get('/api/client/',{
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) =>{
            console.log(res);
            setLoading(false)
            
            const clientData = res.data.data.map((client) => ({
                name: client.name,
                id: client._id
            }));

            setClients(clientData);
            setRefresh(false)
        })
    }, [refresh])
    
    return (
    <div className=''>
    <div className="h-screen flex flex-col">
      <div className="flex-1 bg-muted rounded-lg p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Clients</h2>
          <div className="flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Create New Client"
              className="bg-background"
            />
            <Button color="primary" className='rounded-lg flex' onClick={handleCreateFolder}>Create</Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          { loading?
              ( <Lottie 
                animationData={loadingAnimation}
                style={{height:500}}
                />):
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 pb-20"> {/* Added pb-6 for padding at the bottom */}
            {clients.map((client) => (
              <div
                key={client.id}
                className="m-2 cursor-pointer"
                onClick={() => router.push(`/dashboard/${client.id}`)}
              >
                <FileCard folderName={client.name} />
              </div>
            ))}
          </div>}
        </div>
      </div>
    </div>
    </div>
      );
    }
