import { dbConnect } from "../../../../utils/db"
import dataObjectModel from "../../../../models/dataObjects"


export const POST = async (request) => {
    await dbConnect()

    const {name} = await request.json();
    
    let data = new dataObjectModel({
        name : name,
        type : 'client'
    })
    await data.save()
    
    return Response.json({
        message :data
    })
}


export const GET = async (request) =>{
    await dbConnect()

    let data = await dataObjectModel.find({ type: 'client'})
    return Response.json({
        data : data,
        Message : "good"
    })
}