// "use client"
// import axios from 'axios';
// import { useParams, useRouter } from "next/navigation";
// import React, { useEffect, useState } from 'react';
// import {
//   ContextMenu,
//   ContextMenuContent,
//   ContextMenuItem,
//   ContextMenuTrigger,
// } from '../../../components/ui/context-menu';
// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogFooter,
// } from '../../../components/ui/alert-dialog';
// import { Label } from '@radix-ui/react-context-menu';
// import { Input } from '../../../components/ui/input';
// import { Button } from '../../../components/ui/button';
// import FileCard from '../../../components/FileCard';
// import loadingAnimation from "../../../lottie/loading.json"
// import Lottie from 'lottie-react';
// import { getFile, uploadFile } from '../../../helper/frontend/page';
// import DataCard from '../../../components/DataCard';



// function Page() {
  
//   const params = useParams();
//   const id = params.id;
//   const router = useRouter();
//   const [folders, setFolders] = useState([]);
//   const [upload, setUpload] = useState(false)
//   const [link, setLink] = useState();
//   const [inputValue, setInputValue] = useState();
//   const [deleteInputChange, setDeleteInputChange] = useState()
//   const [refresh,setRefresh] = useState(false)
//   const[loading, setLoading] = useState(false)
//   const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
//   const [newFolder, setNewFolder] = useState('');
  
//   const myTimeout = setTimeout(() =>{setRefresh(false)}, 5000);
  
//     const handleUploadFile = async (event) => {
//         setLoading(true)
//         const file = event.target.files[0]
        
//         const formData = new FormData();
//         formData.append('file', file);
        
//         await uploadFile(id,formData)
//         setLoading(false)
//         setRefresh(true)
//         myTimeout
//     }

//     const handleFileGet = async(key) => {
//       setLoading(true)
//       let res = await getFile(id,key)
//       setLoading(false)
//       router.push(`/dashboard/video/${encodeURIComponent(res.data.src)}`)
//       setLink(res.data.src)
//       return res.data.res
//      }
//      const handleCancel = () => {
//       setIsAlertDialogOpen(false);
//       setNewFolder('');
//     };

//      const handleInputChange = (event) => {
//          setInputValue(event.target.value);
//      };
//      const handleDeleteInputChange = (event) => {
//       setDeleteInputChange(event.target.value);
//   };
 
       
  
//      const handleCreateFolder = () => {
//          setLoading(true)
//          axios.post(`/api/client/${id}`,
//          {name: newFolder, type : 'folder'},
//          {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//          })
//          .then((res) =>
//          {
//           setRefresh(true)
//           setLoading(false)}
//         )
//         setIsAlertDialogOpen(false);
//         myTimeout
//      }
//     //  const handleDeleteFolder = () =>{
//     //     axios.post(`/api/client/${deleteInputChange}`,
//     //       {name : newFolder , type : 'deleteFolder'},
//     //       {
//     //       headers: {
//     //         'Content-Type': 'application/json',
//     //       },
//     //     })
//     //     .then((res) =>{
//     //       console.log(res);
//     //     })
//     //     setIsAlertDialogOpen(false);
//     //  }

//     useEffect(() => {
//         axios.get(`/api/client/${id}`, {
//             headers: {
//                 "Content-Type": "application/json",
//             }
//         })
//         .then((res) => {
//             const foldersData = res.data.data.folder.map((folder) => ({
//                 name: folder.name,
//                 id: folder._id,
//                 type: folder.type
//             }));

//             setFolders(foldersData);
//         })
//         .catch((error) => {
//             console.error('Error fetching folders:', error);
//         });
//     }, [refresh]);



// return (
//     <div>
//       <ContextMenu>
//         <ContextMenuTrigger className="flex flex-col h-screen overflow-hidden rounded-md border border-dashed text-sm ">
          
//           <div className="flex items-center justify-end p-3">
//             <Input className="w-48 bg-blue-600/90 text-white file:text-white" type="file" onChange={handleUploadFile} />
//           </div>
//           <div className="flex-1 overflow-y-auto h-auto">
//            { loading ?
//            ( <Lottie
//             animationData={loadingAnimation}
//             style={{height:400}}
//             />):
//             <div className="flex justify-center items-center flex-col">
//               <div className="flex flex-wrap justify-center gap-7 pb-20">
//                 {folders.map((folder, index) => (
//                   <div
//                     key={index}
//                     className="cursor-pointer"
//                     onClick={() => {
//                       if (folder.type === 'file') {
//                         handleFileGet(folder.name);
//                       } else {
//                         // router.push(`/dashboard/${folder.id}`);
//                       }
//                     }}
//                   >
//                     {
//                       folder.type === 'file'?
//                       <DataCard folderName={folder.name} folderId={folder.id}/>:
//                       <FileCard folderName={folder.name} folderId={folder.id} />
//                     }
//                   </div>
//                 ))}
//               </div>
//             </div>}
//           </div>
  
//         </ContextMenuTrigger>

//         <ContextMenuContent className="w-64">
//           <ContextMenuItem inset onClick={() => setIsAlertDialogOpen(true)}>
//             Create Folder
//           </ContextMenuItem>
//           {/* <ContextMenuItem inset onClick={() => setIsAlertDialogOpen(true) }>
//             Delete Folder
//           </ContextMenuItem> */}
//         </ContextMenuContent>
//       </ContextMenu>

//       <AlertDialog open={isAlertDialogOpen}>
//         <AlertDialogContent>
//           <Label>Folder Name</Label>
//           <Input value={newFolder} onChange={(e) => setNewFolder(e.target.value)} />
//           <AlertDialogFooter>
//             <Button onClick={handleCancel}>Cancel</Button>
//             <Button onClick={handleCreateFolder}>Create</Button>
//             {/* <Button onClick={handleDeleteFolder}> Delete Folder</Button> */}
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//       </div>
// );

// }

// export default Page;



// 'use client';
// import axios from 'axios';
// import { useParams, useRouter } from "next/navigation";
// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   ContextMenu,
//   ContextMenuContent,
//   ContextMenuItem,
//   ContextMenuTrigger,
// } from '../../../components/ui/context-menu';
// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogFooter,
// } from '../../../components/ui/alert-dialog';
// import { Label } from '@radix-ui/react-context-menu';
// import { Input } from '../../../components/ui/input';
// import { Button } from '../../../components/ui/button';
// import FileCard from '../../../components/FileCard';
// import loadingAnimation from "../../../lottie/loading.json";
// import Lottie from 'lottie-react';
// import { getFile, uploadFile } from '../../../helper/frontend/page';
// import DataCard from '../../../components/DataCard';
// import { MyContext } from '@/MyContext/MyContext';

// function Page() {
  // const params = useParams();
  // const id = params.id;
  // const router = useRouter();
//   const [folders, setFolders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
//   const [newFolder, setNewFolder] = useState('');

//   const fetchFolders = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`/api/client/${id}`, {
//         headers: { "Content-Type": "application/json" },
//       });
//       const foldersData = res.data.data.folder.map((folder) => ({
//         name: folder.name,
//         id: folder._id,
//         type: folder.type,
//       }));
//       setFolders(foldersData);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching folders:', error);
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchFolders();
//   }, [fetchFolders]);

//   const handleUploadFile = async (event) => {
//     setLoading(true);
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file);
//     await uploadFile(id, formData);
//     await fetchFolders();
//     setLoading(false);
//   };

  // const handleFileGet = async (key) => {
  //   setLoading(true);
  //   const res = await getFile(id, key);
  //   setLoading(false);
  //   router.push(`/dashboard/video/${encodeURIComponent(res.data.src)}`);
  // };

//   const handleCreateFolder = async () => {
//     setLoading(true);
//     await axios.post(`/api/client/${id}`, { name: newFolder, type: 'folder' }, {
//       headers: { 'Content-Type': 'application/json' },
//     });
//     await fetchFolders();
//     setLoading(false);
//     setIsAlertDialogOpen(false);
//   };

//   const handleCancel = () => {
//     setIsAlertDialogOpen(false);
//     setNewFolder('');
//   };

//   return (
//     <div>
//       <MyContext.Provider value={{}}>
//       <ContextMenu>
//         <ContextMenuTrigger className="flex flex-col h-screen overflow-hidden rounded-md border border-dashed text-sm ">
//           <div className="flex items-center justify-end p-3">
            // <Input className="w-48 bg-blue-600/90 text-white file:text-white" type="file" onChange={handleUploadFile} />
//           </div>
//           <div className="flex-1 overflow-y-auto h-auto">
//             {loading ? (
//               <Lottie animationData={loadingAnimation} style={{ height: 400 }} />
//             ) : (
//               <div className="flex justify-center items-center flex-col">
//                 <div className="flex flex-wrap justify-center gap-7 pb-20">
//                   {folders.map((folder, index) => (
//                     <div
//                       key={index}
//                       className="cursor-pointer"
//                       onClick={() => {
//                         if (folder.type === 'file') {
//                           handleFileGet(folder.name);
//                         } else {
//                           // router.push(`/dashboard/${folder.id}`);
//                         }
//                       }}
//                     >
//                       {folder.type === 'file' ? (
//                         <DataCard folderName={folder.name} folderId={folder.id} />
//                       ) : (
//                         <FileCard folderName={folder.name} folderId={folder.id} />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </ContextMenuTrigger>

//         <ContextMenuContent className="w-64">
//           <ContextMenuItem inset onClick={() => setIsAlertDialogOpen(true)}>
//             Create Folder
//           </ContextMenuItem>
//         </ContextMenuContent>
//       </ContextMenu>

//       <AlertDialog open={isAlertDialogOpen}>
//         <AlertDialogContent>
//           <Label>Folder Name</Label>
//           <Input value={newFolder} onChange={(e) => setNewFolder(e.target.value)} />
//           <AlertDialogFooter>
//             <Button onClick={handleCancel}>Cancel</Button>
//             <Button onClick={handleCreateFolder}>Create</Button>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//       </MyContext.Provider>
//     </div>
//   );
// }

// export default Page;


"use client"
import DataCard from '@/components/DataCard'
import FileCard from '@/components/FileCard'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getFolders, handleCreateFolder, uploadFile } from '@/helper/frontend/page'
import { Upload } from '@aws-sdk/lib-storage'
import { Slash } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { S3Client } from "@aws-sdk/client-s3";
import axios from 'axios'
import { FileUploader } from "react-drag-drop-files";
import { useS3Upload } from "next-s3-upload";
import { Progress } from '../../../components/ui/progress'

export default function page() {
  const params = useParams();
  const id = params.id;
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createFolder,setCreateFolder] = useState(null)
  
  useEffect(() => {
    const fetchFolders = async () => {
      setLoading(true);
      const foldersData = await getFolders(id);
      console.log(foldersData);
      const res = foldersData.data.data.folder.map((folder) =>({
          name : folder.name,
          id : folder._id,
          type : folder.type
      }))
      setFolders(res)
      setLoading(false);
    };

    fetchFolders();
  }, []);

  const s3 = new S3Client({
    region:process.env.NEXT_PUBLIC_AWS_S3_REGION ,
    credentials: {
      accessKeyId:process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID ,
      secretAccessKey:process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
    }
  });



  const [urls, setUrls] = useState([]);
  const { uploadToS3,files } = useS3Upload();

  const handleFilesChange = async ({ target }) => {
    const files = Array.from(target.files);
    const fileNames = files.map(file => file.name);
  
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const { url } = await uploadToS3(file);
  
      console.log('File Name:', file.name);
  
      axios.post(`/api/client/${id}`,
        {name : file.name, type : 'file',url : url},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      setUrls(current => [...current, url]);
    }
  };

  // const [progress, setProgress] =useState(0)
return (
<div className="h-screen flex flex-col">
  <div className="flex-1 bg-muted rounded-lg p-6 flex flex-col">
    <div className="flex items-center justify-between mb-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
          <BreadcrumbLink href="/">Folders</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-5">
        <Input
          value={createFolder}
          onChange={(event) => {setCreateFolder(event.target.value)}}
          placeholder="Create New Client"
          className="bg-background"
        />
        <Button color="primary" className='rounded-lg flex' onClick={() => handleCreateFolder(createFolder, id)} >Create</Button>
        <input
        type="file"
        name="file"
        multiple={true}
        onChange={handleFilesChange}
      />
      </div>
    </div>

    <div className="pt-8">
        {files.map((file, index) => (
          <div key={index}>
            File #{index} progress: {file.progress}%
            <Progress value={file.progress} className="w-[60%]"/>
          </div>
        ))}
      </div>
      {/* <div>
        {urls.map((url, index) => (
          <div key={url}>
            File {index}: ${url}
          </div>
        ))}
    </div> */}

    <div className="flex-1 overflow-y-auto">
      { 
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 pb-20">
        {
        folders.map((folder, index) => (

          <div key={index} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 pb-20">
          {folder.type == 'file' ? (
            <DataCard folderName={folder.name} folderId={folder.id}/>
          ) : (
            <FileCard folderName={folder.name} folderId={folder.id}/>
          )}
        </div>
        ))
      }
        </div>
      }
    </div>
  </div>
</div>
  )
}

