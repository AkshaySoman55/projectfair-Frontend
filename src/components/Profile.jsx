import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { BASE_URL } from '../pagess/services/baseUrl';
import { ToastContainer, toast } from "react-toastify";
import { updateProfileApi } from '../pagess/services/allApi';




function Profile() {
  const [open, setOpen] = useState(false);
  const [existingImage, setExistingImage]= useState("")
  const [preview, setPreview] = useState("")
  const [update, setUpdate] = useState(false)

  const [userProfile, setUserProfile] = useState({
    username:"",
    emailid:"",
    password:"",
    github:"",
    linkedin:"",
    profile:""

  })

  console.log(userProfile);

  useEffect(()=>{
     const user = JSON.parse(sessionStorage.getItem('existingUser'))
     setUserProfile({...userProfile,username:user.username,emailid:user.mailId,password:user.password,github:user.github,linkedin:user.linkedIn})

     //if there is any uploaded image
     setExistingImage(user.profile)
  },[update])

  useEffect(()=>{

    userProfile.profile &&
    setPreview(URL.createObjectURL(userProfile.profile))//to convert the file into url


  },[userProfile.profile])

  console.log(preview);

  const handleUpdate =async (e)=>{
    e.preventDefault()

    const {username,emailid,password,github,linkedin,profile} = userProfile

    if(!github || !linkedin){
      toast.info('Please fill the form completely')

    }
    else{

      const reqBody = new FormData()

      //to add data to the body - use append() can add only one item
      reqBody.append("username",username)
      reqBody.append("emailid",emailid)
      reqBody.append("github",github)
      reqBody.append("password",password)
      reqBody.append("linkedin",linkedin)

      preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)
    
      //append() - add
    
    const token = sessionStorage.getItem("token")

    
    if(preview){
      const reqHeader={//upload
        'Content-Type':'multipart/form-data',
        'Authorization':`Bearer ${token}` //bearer - no other credential/or document is required to verify the request holder
      }
      const result = await updateProfileApi(reqBody,reqHeader)
      if(result.status==200){
        toast.success('Profile updated successfully')
        setUpdate(true)
        sessionStorage.setItem("existingUser",JSON.stringify(result.data))
      }
  }
  else{
    const reqHeader={//no upload
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
  }
  const result = await updateProfileApi(reqBody,reqHeader)
      if(result.status==200){
        toast.success('Profile updated successfully')
        sessionStorage.setItem("existingUser",JSON.stringify(result.data))
      }
  
}
  }
}

  return (
    <div className='border p-4 rounded shadow'>

      <div className='d-flex justify-content-between'>
        <h3>Profile</h3>
        <button  onClick={() => setOpen(!open)}
        onMouseEnter={()=>setOpen(true)} className='btn btn-outline-info'>{ open?<FontAwesomeIcon icon={faAngleUp} />:<FontAwesomeIcon icon={faAngleDown} />}</button>

      </div>

     <Collapse in={open}>
        <div className='row p-3 text-center mt-4'>
          <label htmlFor="profile">
            <input id='profile' type="file" style={{display:'none'}} onChange={(e)=>setUserProfile({...userProfile,profile:e.target.files[0]})} />

    
          { existingImage =="" ?
           <img src={preview?preview:'https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_640.png'} alt="user img" style={{height:'200px',width:'200px',borderRadius:'50%'}} />  :

            <img src={preview?preview:`${BASE_URL}/uploads/${existingImage}`} alt="user img" style={{height:'200px',width:'200px',borderRadius:'50%'}} />
            }

          </label>
  
          <div className="mb-3 mt-5">
            <input type="text" placeholder='GitHub' className='form-control' value={userProfile.github} onChange={(e)=>setUserProfile({...userProfile,github:e.target.value})}/>
          </div>
  
          <div className="mb-3">
            <input type="text" placeholder='Linkedin' className='form-control' value={userProfile.linkedin} onChange={(e)=>setUserProfile({...userProfile,linkedin:e.target.value})}/>
          </div>
  
          <div className="mb-3">
            <button onClick={(e)=>handleUpdate(e)} className='btn w-100' style={{backgroundColor:'green',color:'white'}}>Update</button>
          </div>
  
        </div>
     </Collapse>
     <ToastContainer theme="colored" position="top-center" autoClose={1000} />

    </div>
  )

}

export default Profile