
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pagess/Dashboard'
import Project from './pagess/Project'
import Home from './pagess/Home'
import Footer from './components/Footer'
import Auth from './components/Auth'
import { useContext } from 'react'
import { logoutResponseContext } from './context/ContextShare'



function App() {

  const {AuthorToken, setAuthorToken} = useContext(logoutResponseContext)
  

  return (
    <>
     <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/project' element={<Project/>}/>
       <Route path='/dashboard' element={AuthorToken?<Dashboard/>:<Home/>}/>
       <Route path='/login' element={<Auth/>}/>
       <Route path='/register' element={<Auth register/>}/>
     </Routes>
     <Footer/>
      
    </>
  )
}

export default App
