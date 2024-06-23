import axios from "axios"

export const createClient = async (inputValue) => {
    axios.post('/api/client/',
        {name : inputValue, type : 'client'},
        {
            headers: {
                "Content-Type": "application/json",
            }
    })
}

export const uploadFile = async (id,formData) =>{
    const response = await axios.post( 
        `/api/client/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
}

export const getFile = async(id,key) =>{
    let res = await axios.get( 
        `/api/client/${id}/${key}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return res
}