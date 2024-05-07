import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Col, Row } from "react-bootstrap";
import ProjectCard from "../components/ProjectCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { allProjectApi } from "./services/allApi";

function Project() {
  const [isToken,setisToken] = useState(false)
  const [allProject,setAllProject ] = useState([])
  const [searchkey, setSearchKey] = useState("")

  const getAllProject = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")

      const reqHeader ={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}` 
      }

      const result = await allProjectApi(searchkey,reqHeader)
      /* console.log(result); */

      if(result.status==200){
        setAllProject(result.data)
      }
      else{
        console.log(result.response.data);
      }
    }
  }

 /*  console.log(searchkey); */

  useEffect(()=>{
    getAllProject()

  },[searchkey])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setisToken(true)
    }
  },[])
  return (
    <>
      <Header />

      <h2 className="text-center mt-5 mb-3">All Projects</h2>

    {isToken? <div className="mt-5 d-flex justify-content-center align-items-center flex-column ">
        <div className="d-flex w-100  justify-content-center align-items-center">
          <div className="row w-100">
            <div className="col-md-4"></div>
            <div className="col-md-4 d-flex justify-content-center align-items-center p-4">
              <input onChange={(e)=>setSearchKey(e.target.value)}
                type="text"
                className="form-control p-2 mb-5 mt-4"
                placeholder="Search Using Technologies"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{
                  marginLeft: "-30px",
                  marginTop: "-30px",
                  color: "grey",
                }}
              />
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
        

        <Row className="container-fluid mb-5">

         { allProject?.length>0?
         allProject.map(item=>(<Col sm={12} md={6} lg={4}>
          { <ProjectCard pro ={item}/> }
        </Col>)) 
        :
        <p>no projects</p>
         
          }
         
        </Row>
      </div>:

      <div className="d-flex  justify-content-center align-items-center flex-column mb-5 mt-5">
            <img
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXc4cXluYWpmd25pOTJtY2poeGZhZHV6ZzQzNnluaGx3bnJ0Y2ZocCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gHPOb1fEVWu5GHL2tk/giphy.gif"
              alt="lock img"
              style={{ width: "200px" }}
            />
            <h3 className="text-danger mt-5 ms-4">
              Please <span className="text-success">Login </span>to See More
              Project
            </h3>
          </div>}
    </>
  );
}

export default Project;
