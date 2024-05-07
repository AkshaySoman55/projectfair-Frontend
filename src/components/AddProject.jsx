import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import { addProjectApi } from "../pagess/services/allApi";
import { addProjectResponseContext } from "../context/ContextShare";

function AddProject() {

  const {setAddProjectResponse} = useContext(addProjectResponseContext)
  const [token, setToken] = useState("")
  const [show, setShow] = useState(false);

  

  //state to hold the details of the project
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImage: ""
  });

  //state to store the url of the file
  const [preview, setPreview] = useState("")

  const [key, setKey] = useState(false)


  useEffect(()=>{
    projectDetails.projectImage ?
    setPreview(URL.createObjectURL(projectDetails.projectImage))//to convert the file into url
    :
    setPreview("")
  },[projectDetails.projectImage])

  //function to reset
  const handleClose1 = ()=>{
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projectImage: ""

    })
    setPreview("")
    setKey(!key)
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }


  },[])
  console.log(token);

  //fuction to add project
  const handleAdd =async(e)=>{
    e.preventDefault()

    const {title,language,github,website,overview,projectImage} = projectDetails
    if(!title|| !language || !github || !website || !overview ||!projectImage){
      toast.info('Please fill the form completely')
    }else{

      //request body - formdata class object
      //if your request contains uploaded content then the body has to be send in the format of formdata

      //1) create an object for formData class
      const reqBody = new FormData()

      //to add data to the body - use append() can add only one item
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)
      //append() - add

      //request header
     if(token){
      const reqHeader ={
        'Content-Type':'multipart/form-data',
        'Authorization':`Bearer ${token}` //bearer - no other credential/or document is required to verify the request holder
      }
       //call api
       const result = await addProjectApi(reqBody, reqHeader)
       console.log(result);
       if(result.status==200){
        toast.success(`Project uploaded successfully`)
        handleClose()
        setAddProjectResponse(result.data)

       }else{
        toast.error(result.response.data)
        handleClose()
       }

     }
     


    }
  }
  
  
  console.log(projectDetails);
  const handleClose = () => {setShow(false);
  handleClose()}
  const handleShow = () => setShow(true);
  return (
    <>
      <div>
        <button onClick={handleShow} className="btn btn-success">
          Add Project
        </button>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">
            Add Project Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 p-3">
              <label htmlFor="img">
                <input type="file" key={key} id="img" style={{ display: "none" }}   onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
                <img
                  src={preview?preview:"https://imgs.search.brave.com/kJcF6nb_M5-a0Zxm8oYZ_Cg1RUJPH8b4AFy9kmz6EH8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzhlL2E5/LzI2LzhlYTkyNmUx/YjA5ZGE4YTMyNDYw/ODc2MGUyZDM5NTgx/LmpwZw"}
                  className="w-100" alt="img"
                />
              </label>
            </div>
            <div className="col-md-6 p-3">
              <div className="mt-4 mb-3">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={projectDetails.title}
                  className="form-control"
                  onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}
                />
              </div>
              <div className="mt-3 mb-3">
                <input
                  type="text"
                  placeholder="Language"
                  className="form-control"
                  value={projectDetails.language}
                  onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}
                />
              </div>
              <div className="mt-3 mb-3">
                <input
                  type="text"
                  placeholder="GitHub Link"
                  className="form-control"
                  value={projectDetails.github}
                  onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}
                />
              </div>
              <div className="mt-3 mb-3">
                <input
                  type="text"
                  placeholder="Website Link"
                  className="form-control"
                  value={projectDetails.website}
                  onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}
                />
              </div>
              <div className="mt-3 mb-3">
                <textarea
                  cols="30"
                  rows="4"
                  placeholder="Overview"
                  className="form-control"
                  value={projectDetails.overview}
                  onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}
                ></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme="colored" position="top-center" autoClose={1000} />
    </>
  );
}

export default AddProject;