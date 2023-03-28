import { useEffect, useRef } from 'react'
const upload = () => {
  const cloudinaryRef = useRef()
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
  }, [])
}
//   return (
//     <>
//     </>
    
//   )

  export default upload