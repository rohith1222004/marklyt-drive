"use client"
import axios from 'axios';
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
// import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../../../components/ui/context-menu';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
} from '../../../components/ui/alert-dialog';
import { Label } from '@radix-ui/react-context-menu';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import FileCard from '../../../components/FileCard';
import loadingAnimation from "../../../lottie/loading.json"
import Lottie from 'lottie-react';
import { getFile, uploadFile } from '../../../helper/frontend/page';
import DataCard from '../../../components/DataCard';



function Page() {

    const params = useParams();
    const id = params.id;
    const router = useRouter();
    const [folders, setFolders] = useState([]);
    const [upload, setUpload] = useState(false)
    const [link, setLink] = useState();
    const [inputValue, setInputValue] = useState();
    const [deleteInputChange, setDeleteInputChange] = useState()
    const [refresh,setRefresh] = useState(false)
    const[loading, setLoading] = useState(false)

    const myTimeout = setTimeout(() =>{setRefresh(false)}, 5000);

    const handleUploadFile = async (event) => {
        setLoading(true)
        const file = event.target.files[0]
        
        const formData = new FormData();
        formData.append('file', file);
        
        await uploadFile(id,formData)
        setLoading(false)
        setRefresh(true)
        myTimeout
    }

    const handleFileGet = async(key) => {
        setLoading(true)
      //   await axios.get( 
      //    `/api/client/${id}/${key}`,
      //    {
      //      headers: {
      //        'Content-Type': 'multipart/form-data',
      //      },
      //    }
      //  )
      //  .then(res => {
      //     setLoading(false)
        //  router.push(`/dashboard/video/${encodeURIComponent(res.data.src)}`)
      //    console.log("Got a Object!" , res.data.src);
        //  setLink(res.data.src)
        //  return res.data.res;
      //    }
      //  )
      let res = await getFile(id,key)
      setLoading(false)
      router.push(`/dashboard/video/${encodeURIComponent(res.data.src)}`)
      setLink(res.data.src)
      return res.data.res
     }


     const handleInputChange = (event) => {
         setInputValue(event.target.value);
     };
     const handleDeleteInputChange = (event) => {
      setDeleteInputChange(event.target.value);
  };
 
       
  
     const handleCreateFolder = () => {
         setLoading(true)
         axios.post(`/api/client/${id}`,
         {name: newFolder, type : 'folder'},
         {
          headers: {
            'Content-Type': 'application/json',
          },
         })
         .then((res) =>
         {
          setRefresh(true)
          setLoading(false)}
        )
        setIsAlertDialogOpen(false);
        myTimeout

     }
     const handleDeleteFolder = () =>{
        axios.post(`/api/client/${deleteInputChange}`,
          {name : newFolder , type : 'deleteFolder'},
          {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) =>{
          console.log(res);
        })
        setIsAlertDialogOpen(false);
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
    }, [refresh]);

//newly added
const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
const [newFolder, setNewFolder] = useState('');
const handleCancel = () => {
  setIsAlertDialogOpen(false);
  setNewFolder('');
};
return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger className="flex flex-col h-screen overflow-hidden rounded-md border border-dashed text-sm ">
          {/* <div className="flex-1 bg-muted rounded-lg p-6 flex flex-col"> */}
          
          <div className="flex items-center justify-end p-3">
            <Input className="w-48 bg-blue-600/90 text-white file:text-white" type="file" onChange={handleUploadFile} />
          </div>
          <div className="flex-1 overflow-y-auto h-auto">
           { loading ?
           ( <Lottie
            animationData={loadingAnimation}
            style={{height:400}}
            />):
            <div className="flex justify-center items-center flex-col">
              <div className="flex flex-wrap justify-center gap-7 pb-20">
                {folders.map((folder, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => {
                      if (folder.type === 'file') {
                        handleFileGet(folder.name);
                      } else {
                        router.push(`/dashboard/${folder.id}`);
                      }
                    }}
                  >
                    {
                      folder.type === 'file'?
                      <DataCard folderName={folder.name}/>:
                      <FileCard folderName={folder.name} />
                    }
                  </div>
                ))}
              </div>
            </div>}
          </div>
  
        {/* </div> */}
        </ContextMenuTrigger>

        <ContextMenuContent className="w-64">
          <ContextMenuItem inset onClick={() => setIsAlertDialogOpen(true)}>
            Create Folder
          </ContextMenuItem>
          <ContextMenuItem inset onClick={() => setIsAlertDialogOpen(true) }>
            Delete Folder
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <AlertDialog open={isAlertDialogOpen}>
        <AlertDialogContent>
          <Label>Folder Name</Label>
          <Input value={newFolder} onChange={(e) => setNewFolder(e.target.value)} />
          <AlertDialogFooter>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleCreateFolder}>Create</Button>
            <Button onClick={handleDeleteFolder}> Delete Folder</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
);

}

export default Page;
