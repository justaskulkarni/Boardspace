import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect, useRef } from 'react'
import UploadWidget from '../components/UploadWidget'

const ProtectedStudent = () => {
  return (
    <>
    {/* <Navbar />
    <div>Namaste jara yeh student ke liye protected hai</div> */}
    <UploadWidget/>
    </>
  )
}

// const UploadWidget = () => {
//   const cloudinaryRef = useRef()
//   useEffect(() => {
//     cloudinaryRef.current = window.cloudinary
//     console.log(cloudinaryRef.current)
//   }, [])

//   return (
//     <>
//     </>
    
//   )
// }

export default ProtectedStudent