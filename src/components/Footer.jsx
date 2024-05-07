import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCubesStacked } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <>
    <div className="row p-5 text-light" style={{backgroundColor:'green'}}>
      <div className="col-md-4">
        <h3><FontAwesomeIcon icon={faCubesStacked} className='me-2'/>Project Fair</h3>
        <p className='mt-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, dicta reprehenderit. Consequuntur voluptates</p>
      </div>

      <div className="col-md-2 ps-5">
        <h3>Links</h3>
     <Link to={'/'} style={{textDecoration:'none', color:'white'}}>   <h6 className='mt-4'>Home</h6></Link>
        <h6>Login</h6>
        <h6>Register</h6>
      </div>

      <div className="col-md-2">
        <h3>Guides</h3>
        <h6 className='mt-4'>React</h6>
        <h6>React Bootstrap</h6>
        <h6> Bootswatch</h6>
      </div>

      <div className="col-md-3">
        <h3>Contact Us</h3>
        <div className='d-flex mt-4'>
          <input type="text" placeholder='Enter Email Id' className='form-control' />
          <button className='btn btn-warning ms-3'>Subscribe</button>
        </div>
        <div className="d-flex mt-4 d-flex justify-content-between">
        <FontAwesomeIcon icon={faInstagram} size='2xl' />
        <FontAwesomeIcon icon={faXTwitter} size='2xl' />
        <FontAwesomeIcon icon={faLinkedin}  size='2xl'/>
        <FontAwesomeIcon icon={faFacebook} size='2xl'/>

        </div>
      </div>
    </div>

    </>
  )
}

export default Footer