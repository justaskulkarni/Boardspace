import React from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'

const Admin_land = () => {

  const getdata = async() => {

    const response = await fetch("http://localhost:6100/api/mentor/getall", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const json = await response.json()

    if(json.success)
    {
      console.log(json.data)
    }
  }
  
  

  return (
    <>
    <Navbar />
    <Card />
    </>
    
  )
}

export default Admin_land