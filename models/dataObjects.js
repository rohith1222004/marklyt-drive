import mongoose, { Schema, model, models} from "mongoose"

const dataObjectSchema = new Schema({
    name : String,
    type: {
        type:String,
        enum:['folder','file','client']
    },
    folder : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'dataObject',
    }]
})

const dataObjectModel = models.dataObject || model('dataObject', dataObjectSchema)

export default dataObjectModel

    