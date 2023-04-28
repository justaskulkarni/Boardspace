import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const ProtectedStudent = () => {

  const [temp, settemp] = useState({ name: "", file: null })

  const hello = (event) => {
    settemp({ ...temp, [event.target.name]: event.target.value })
  }

  const rukjao = (event) => {
    let file1 = event.target.files[0]
    settemp({ ...temp, file: file1 })
    console.log("hi")
  }


  const handleme = async(e) => {
    e.preventDefault()
    console.log(temp)

    const typef = temp.file.type
    const splitted = typef.split("/")

    if(splitted[0] === "image"){
      
      let data = new FormData()

      data.append('image',temp.file)
      data.append('hello',temp.name)
  
      const response = await fetch('/temp', {
        method: 'POST',
        body: data
      })
  
      const json = await response.json()
  
      if (json.error) {
        console.log(json.error)
      }
    }
    else{
      console.log("hatt teri mkc")
    }
    
  }

  return (
    <>
      <div>
        <form onSubmit={handleme} encType="multipart/form">
          <input type="file" onChange={rukjao} />
          <input type="text" onChange={hello} name="name" value={temp.name} />
          <button>fuck</button>
        </form>
      </div>
    </>
  )
}

export default ProtectedStudent