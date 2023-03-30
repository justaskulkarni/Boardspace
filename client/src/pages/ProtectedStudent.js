import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect, useRef } from 'react'


const ProtectedStudent = () => {

  const cloudinaryRef = useRef()
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    console.log(cloudinaryRef.current)
  }, [])

  return (
    <>
      <Navbar />
      <div>Namaste jara yeh student ke liye protected hai</div>
    </>
  )
}

export default ProtectedStudent