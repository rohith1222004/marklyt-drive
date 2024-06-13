"use client"
import axios from 'axios'
import React, { useState , useEffect} from 'react'
import {useRouter } from "next/navigation";
import FolderCard from '../../../components/folderCard';
import {Button} from "@nextui-org/button";
import FileCard from '@/components/FileCard';
import TopBar from '@/components/TopBar';


export default function page() {
    const router = useRouter();
    const [clients, setClients] = useState([])
    const [inputValue, setInputValue] = useState('');
    const [refresh , setRefresh] = useState(false)
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

      
    const handleCreateFolder = () => {
        axios.post('/api/client/',
        {name : inputValue, type : 'client'},
        {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) =>{console.log(res)
            setRefresh(true)
        })
    }

    useEffect(() => {
        axios.get('/api/client/',{
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) =>{
            console.log(res);

            
            const clientData = res.data.data.map((client) => ({
                name: client.name,
                id: client._id
            }));

            setClients(clientData);
        })
    }, [refresh])
    
    return (
        <div className='flex flex-col p-4'>
          <div className='flex mb-4'>
            <input
              style={{
                margin: 5,
                border: '2px solid gray',
                borderRadius: '0.375rem',
                padding: '0.5rem',
                color: '#4b5563'
              }}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
            <div className='flex items-center'>
            <Button color="primary" className='rounded-lg flex' onClick={handleCreateFolder}>Create Client</Button>
            </div>
          </div>
          <div className='flex flex-wrap justify-center'>
            {clients.map((client, index) => (
              <div
                key={client.id}
                className='m-2 cursor-pointer '
                onClick={() => router.push(`/dashboard/${client.id}`)}
              >
                <FileCard folderName={client.name} />
              </div>
            ))}
          </div>
        </div>
      );
    }
