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
  console.log(userid)

  const cloudinaryRef = useRef()
  const widgetRef = useRef()
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'djb8pgo4n',
      uploadPreset: 'm79rihxp',
      public_id: `${userid}/hello/hi`
    }, function (error, result) {
      if (!error && result && result.event == "success") {
        console.log(result.info)
        // console.log(result.info.secure_url)
        const imageURL = result.info.secure_url
        // const PublicId = (imageURL) => imageURL.split("/").pop().split(".")[0];
        console.log(imageURL)
        const PublicId = extractPublicId(imageURL)
        console.log(PublicId)
        // cloudinaryRef.v2.uploader.rename(PublicId, userid).then(console.log("RENAMED."));
      }
    })
    // console.log(cloudinaryRef.current)
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