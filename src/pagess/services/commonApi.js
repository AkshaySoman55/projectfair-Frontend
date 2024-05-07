import axios from "axios"





export const commonAPI = async(httpRequest,url,reqBody,reqHeader)=>{

  const reqConfig = {
    method:httpRequest,
    url:url,
    data:reqBody,
    headers:reqHeader?reqHeader:{'Content-Type':'application/json'}
    //since we have two type of data - request with upload content and request without upload content
  }

  return await axios (reqConfig).then((result)=>{
    return result
  }).catch ((err)=>{
    return err
  })

}


// if uploaded content should be multiparts.formdata
// if no uploaded content in headers application/json
