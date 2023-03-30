import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect, useRef } from 'react'
import jwt_decode from 'jwt-decode'
import { extractPublicId } from 'cloudinary-build-url'

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
      public_id: `${userid}/hello/hi`
    }, function (error, result) {
    })
  }, [])

  return (
    <>
      <button onClick={() => widgetRef.current.open()}>
        Upload
      </button>
      {/* <Navbar /> */}
      {/* <div>Namaste jara yeh student ke liye protected hai</div> */}
    </>
  )
}

export default ProtectedStudent