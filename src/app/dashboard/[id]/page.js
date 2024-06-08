"use client"
import axios from 'axios';
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import FolderCard from '../../../../components/folderCard';



function Page() {

    const params = useParams();
    const id = params.id;
    const router = useRouter();
    const [folders, setFolders] = useState([]);
    const [upload, setUpload] = useState(false)
    const [link, setLink] = useState();
    const [inputValue, setInputValue] = useState();
    const [deleteInputChange, setDeleteInputChange] = useState()


    const handleUploadFile = async (event) => {
        const file = event.target.files[0]
        console.log('====================================');
        console.log(file);
        console.log('====================================');

        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post( 
          `/api/client/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        console.log('====================================');
        console.log(response);
        console.log('====================================');
        setUpload(true)

        const myTimeout = setTimeout(() =>{setUpload(false)}, 5000);
    }

    const handleFileGet = async(key) => {
        await axios.get( 
         `/api/client/${id}/${key}`,
         {
           headers: {
             'Content-Type': 'multipart/form-data',
           },
         }
       )
       .then(res => {
         router.push(`/dashboard/video/${encodeURIComponent(res.data.src)}`)
         console.log("Got a Object!" , res.data.src);
         setLink(res.data.src)
         console.log('====================================');
         console.log(link);
         console.log('====================================');
         return res.data.res;
         }
       )
     }


     const handleInputChange = (event) => {
         setInputValue(event.target.value);
     };
     const handleDeleteInputChange = (event) => {
      setDeleteInputChange(event.target.value);
  };
 
       
     const handleCreateFolder = () => {
         
         axios.post(`/api/client/${id}`,
         {name: inputValue, type : 'folder'},
         {
          headers: {
            'Content-Type': 'application/json',
          },
         })
         .then((res) =>
         setUpload(true)
        )
        setUpload(false);

     }
     const handleDeleteFolder = () =>{
        axios.post(`/api/client/${deleteInputChange}`,
          {name : deleteInputChange , type : 'deleteFolder'},
          {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) =>{
          setUpload(true);
        })
        setUpload(false)
     }

    useEffect(() => {
        axios.get(`/api/client/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => {
            const foldersData = res.data.data.folder.map((folder) => ({
                name: folder.name,
                id: folder._id,
                type: folder.type
            }));

            setFolders(foldersData);
        })
        .catch((error) => {
            console.error('Error fetching folders:', error);
        });
    }, [upload]);

    return (
        <div>
        <input
          style={{
            margin:5,
            border: '2px solid gray',
            borderRadius: '0.375rem',
            padding: '0.5rem',
            color: '#4b5563'
          }}

            type="text"
            value={inputValue}
            onChange={handleInputChange}
        />
        <button color="primary" onClick={handleCreateFolder}>Create Folder</button>
          <input style={{marginLeft:500}} type="file" onChange={handleUploadFile} />


          <input style={{margin:10}} type="text" onChange={handleUploadFile} />
          <input
          style={{
            margin:5,
            border: '2px solid gray',
            borderRadius: '0.375rem',
            padding: '0.5rem',
            color: '#4b5563'
          }}

            type="text"
            value={deleteInputChange}
            onChange={handleDeleteInputChange}
        />

        <button color="primary" onClick={handleDeleteFolder}>Delete Folder</button>
            
            {folders.map((folder, index) => (
                <div 
                key={index}
                onClick={() =>{

                    if (folder.type == 'file') {
                        handleFileGet(folder.name)
                    } else {
                        router.push(`/dashboard/${folder.id}`)
                    }
                }}
                >   
                    <FolderCard folder={folder.name} />
                </div>
            ))}

            <div>
                {upload?'Uploaded!!!':null}
            </div>
        </div>
    );
}

export default Page;
