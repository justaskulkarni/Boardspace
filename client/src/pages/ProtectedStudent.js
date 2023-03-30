import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect, useRef } from 'react'
import jwt_decode from 'jwt-decode'

const ProtectedStudent = () => {

  const returnId = (reqtoken) => {
    if (reqtoken) {
      var decoded = jwt_decode(reqtoken)
      return (decoded.id)
    }
    else {
      return (null)
    }
  }
  var uid = returnId(localStorage.getItem("Token"))
  const userid = String(uid)

  const cloudinaryRef = useRef()
  const widgetRef = useRef()
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'djb8pgo4n',
      uploadPreset: 'm79rihxp',
      public_id: `${userid}/abc/123`
    }, function (error, result) {
    })
  }, [])

  return (
    <>
      <Navbar />

      <div>
        <button onClick={() => widgetRef.current.open()}>
          Upload
        </button>
      <div>
          <img src={result.secure_url}></img>
      </div>
      </div>
      
    </>
  )
}

export default ProtectedStudent