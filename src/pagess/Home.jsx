import { faArrowRight, faCubesStacked } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleimg from '../assets/title.png'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { HomeProjectApi } from './services/allApi'



function Home() {
  const [islogin,setIsLogin] = useState(false)
  const [Project,setProject] = useState([])

  useEffect(()=>{
    if(sessionStorage.getItem("token"))
    setIsLogin(true)


  },[])

  const gethomeProject = async()=>{
    const result = await HomeProjectApi()
    setProject(result.data);

  }
  console.log(Project);
  useEffect(()=>{
    gethomeProject()

  },[])


  return (
   <>
      <div style={{width:'100%', height:'100vh', backgroundColor:'green'}}>
        <div className="container-fluid rounded text-light">
          <Row className='align-items-center p-5'>
            <Col sm={12} md={6}>
              <h1><FontAwesomeIcon icon={faCubesStacked} className='me-2'/>Project Fair</h1>
              <p classNam='mt-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam dicta rem</p>

          {islogin?  <Link to={'/dashboard'}>  <button className='btn btn-warning'>Manage Project<FontAwesomeIcon className='ms-2 ' icon={faArrowRight} /></button></Link>:

            <Link to={'/login'}>  <button className='btn btn-warning'>Get Start<FontAwesomeIcon className='ms-2 ' icon={faArrowRight} /></button></Link>
  }
            </Col>
            <Col sm={12} md={6}>
              <img src={titleimg} alt="image" className='w-100' />
  
            </Col>
          </Row>
  
        </div>
        
      </div>
       
       <div className="mt-5" >
        <h1 className='text-center '>Explore Our Project</h1>


     <marquee scrollmount={30}>
      
         <div className='d-flex mt-5 mb-5'>

            { Project?.length>0?<div className='row'>


            { Project.map((item)=>(<div className='col-md-4'> <ProjectCard pro={item}/></div>))}
              
            </div>:null}


         </div>
  
     </marquee>
      <div className='text-center mb-5'> 
      <Link to={'./project'}>See More Project</Link></div>

       </div>

   </>
  )
}

export default Home