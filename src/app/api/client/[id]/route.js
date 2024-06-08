import { dbConnect } from "../../../../../utils/db";
import dataObjectModel from "../../../../../models/dataObjects";
import { S3Client, PutObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;


const s3Client = new S3Client({
	region:'ap-south-1' ,
	credentials: {
		accessKeyId:'AKIA2KVQI3ET4PX2RU5B' ,
		secretAccessKey:'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',
	}
});
async function uploadFileToS3(file , fileName) {

	const fileBuffer = file;
	console.log(fileName);

	const params = {
		Bucket: 'custom-drive',
		Key: `${fileName}`,
		Body: fileBuffer,
	}

	const command = new PutObjectCommand(params);
	await s3Client.send(command);

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

// export async function GET() {
//   const response = await s3Client.send(new ListObjectsCommand({ Bucket:'custom-drive' }));
//   return Response.json(response?.Contents ?? []);
// }

export const POST = async (request , {params}) =>{

  await dbConnect();
  let clientId = params.id;
  const contentType = request.headers.get('content-type') || '';

  
  if (contentType.includes('multipart/form-data')) {
    
    console.log(clientId);
    
    const formData = await request.formData();
    
    const file = formData.get("file");
    console.log(file)   
    console.log(file.name);
    
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name);
    
    const newDataObject = new dataObjectModel({name : file.name, type : 'file'})
    await newDataObject.save()
    console.log("new Data object saved");
    
    await dataObjectModel.updateOne(
      {_id : clientId},
      {$push : {folder : newDataObject}}
      )
      
      return Response.json({success: true,fileName: file.name})
      }
      
      else{
        const folder = await request.json();
        console.log(folder.name);
        
        
        if (folder.type === 'deleteFolder') {
          // Handle delete folder request
          const deleteFolderName = folder.name;
          await dataObjectModel.deleteOne({name : deleteFolderName})
          return Response.json({
            folder : deleteFolderName
            })
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
  
}