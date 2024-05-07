import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Navbar } from 'react-bootstrap'
import { faCubesStacked, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { logoutResponseContext } from '../context/ContextShare'



function Header() {

  const {AuthorToken, setAuthorToken} = useContext(logoutResponseContext)

  const navigate = useNavigate()

  const handleLogout=()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setAuthorToken(false)
    navigate('/')
  }
  return (
    <>
        <Navbar style={{backgroundColor:'green'}}>
        <Container>
          <Link to={'/'} style={{textDecoration:'none'}}>
            <Navbar.Brand href="#home" className='text-light fs-3 w-100'>
            <FontAwesomeIcon icon={faCubesStacked} />{' '}
            Project-Fair
            </Navbar.Brand>
            
          </Link>
          <button onClick={handleLogout} className='btn btn-warning   ms-auto'>Logout<FontAwesomeIcon icon={faPowerOff} /></button>
        </Container>
      </Navbar>
    </>
  )
}

export default Header