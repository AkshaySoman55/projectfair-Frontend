import React, { createContext, useState } from 'react'



//context to add project
export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext()
export const logoutResponseContext = createContext()

function ContextShare({children}) {

  //children us a predefined props used to share data btw the components 

  const  [addProjectResponse, setAddProjectResponse] = useState({})

  const [editProjectResponse,seteditProjectResponse] = useState({})

  const [AuthorToken, setAuthorToken] = useState(true)

  return (
    <>
    <addProjectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
      <editProjectResponseContext.Provider value={{editProjectResponse,seteditProjectResponse}}>
        <logoutResponseContext.Provider value={{AuthorToken, setAuthorToken}} >{children}</logoutResponseContext.Provider>
        </editProjectResponseContext.Provider>
    </addProjectResponseContext.Provider>


    </>
  )
}

export default ContextShare