import { dbConnect } from "../../../../../utils/db";
import dataObjectModel from "../../../../../models/dataObjects";
import { S3Client, PutObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import mongoose from "mongoose";
import { Upload } from "@aws-sdk/lib-storage";
const { ObjectId } = mongoose.Types;


const s3Client = new S3Client({
	region:process.env.NEXT_PUBLIC_AWS_S3_REGION ,
	credentials: {
		accessKeyId:process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID ,
		secretAccessKey:process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
	}
});
async function uploadFileToS3(file , fileName) {

	const fileBuffer = file;
	console.log(fileName);

	const params = {
		Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
		Key: `${fileName}`,
		Body: fileBuffer,
    // forcePathStyle: true
	}

	// const command = new PutObjectCommand(params);
  // await s3Client.send(command);
  const upload = new Upload({
    client: s3Client,
    params,
    queueSize: 4,
    partSize: 1024 * 1024 * 5,
  });
  upload.on('httpUploadProgress', (progress) => {
    console.log(progress);
  });
  const data = await upload.done();

	return fileName;
}


export const GET = async (req, {params}) =>{
  let clientId = params.id
  let data = await dataObjectModel.findById(clientId).populate('folder').lean()
  return Response.json({
    data : data,
    Message : "Good"
  })
}


export const POST = async (request , {params}) =>{

  await dbConnect();
  let clientId = params.id;
  // const contentType = request.headers.get('content-type') || '';
  
  // if (contentType.includes('multipart/form-data')) {
    
  //   console.log(clientId);
    
  //   const formData = await request.formData();
    
  //   const file = formData.get("file");
  //   console.log(file)   
  //   console.log(file.name);
    
  //   const buffer = Buffer.from(await file.arrayBuffer());
  //   const fileName = await uploadFileToS3(buffer, file.name);
    
    // const newDataObject = new dataObjectModel({name : file.name, type : 'file'})
    // await newDataObject.save()
    // console.log("new Data object saved");
    
    // await dataObjectModel.updateOne(
    //   {_id : clientId},
    //   {$push : {folder : newDataObject}}
    //   )
      
  //     return Response.json({success: true,fileName: file.name})
  //     }
      
  // else{
        const folder = await request.json();
        // console.log(folder);

        if(folder.type === 'file'){
          const newDataObject = new dataObjectModel({name : folder.name, type : 'file',url : folder.url})
          await newDataObject.save()
          console.log("new Data object saved");
          
          await dataObjectModel.updateOne(
            {_id : clientId},
            {$push : {folder : newDataObject}}
          )

          return Response.json(newDataObject)  
        }
        
        if(folder.type === 'getFile'){
          const urlRes = await dataObjectModel.findById(folder.id)
          console.log("my url",urlRes.url)
          return Response.json(urlRes.url)
        }

        if (folder.type === 'deleteFolder') {
          console.log(folder.id);
          const parentDocument = await dataObjectModel.findById(folder.id);
          console.log(parentDocument);
          console.log(folder.id);
          if (!parentDocument) {
            console.log(parentDocument);
            await dataObjectModel.deleteOne({_id : ObjectId(parentDocument.id)})
          }

          const folderIds = parentDocument.folder.map(folder => folder.toString());
          folderIds.push(folder.id);
          console.log(folderIds);
          const deleteResult = await dataObjectModel.deleteMany({ _id: { $in: folderIds } });
          return Response.json(deleteResult)
          } 

        else{
          const objectId = new ObjectId(params.id)
          const newDataObject = new dataObjectModel({name : folder.name,type : folder.type})
          await newDataObject.save()

          await dataObjectModel.updateOne(
            {_id : objectId},
            {$push : {folder : newDataObject}}
          )

          return Response.json({
            message : "good",
            data : folder.name
          })
        }
  }
  
// }





