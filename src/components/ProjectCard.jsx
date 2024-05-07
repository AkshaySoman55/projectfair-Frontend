import React, { useState } from 'react'
import {  Card, Col, Modal, Row } from 'react-bootstrap'
import photo from '../assets/luffy.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../pagess/services/baseUrl';




function ProjectCard({pro}) {
  const [show , setShow] = useState(false);
  const handleClose = ()=> setShow(false);
  const handleShow = ()=> setShow(true);
  return (
    <>
        <Card className='m-md-4 shadow p-3 w-100' onClick={handleShow}>
      <Card.Img variant="top" src={pro?`${BASE_URL}/uploads/${pro.projectImage}`:null} />
      <Card.Body> 
        <Card.Title className='text-center'>{pro.title}</Card.Title>
        <Card.Text>
         
        </Card.Text>
     
      </Card.Body>
    </Card>

    
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{pro.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
              <img src={pro?`${BASE_URL}/uploads/${pro.projectImage}`:null} alt="" className='w-100'/>

            </Col>
            <Col sm={12} md={6}>

              <h4>Description</h4>
              <p>{pro.overview}</p>
              <h4>Technologies</h4>
              <p>{pro.language}</p>

            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div className='me-auto'>
            <Link to={pro.github} target ='_blank'> <FontAwesomeIcon icon={faGithub} size='2xl' className='me-5'/></Link>
            <Link to={pro.website} target ='_blank'> <FontAwesomeIcon icon={faLink} size ='2xl' /></Link>
          </div>
         
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectCard