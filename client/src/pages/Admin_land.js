import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'

const Admin_land = () => {

  const idArray = [] 
  

  const getdata = async() => {

    const response = await fetch("http://localhost:6100/api/admin/getall", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const json = await response.json()

    if(json.success)
    {
      console.log(json.data)
      console.log(json.data[0]._id)
      
    }
  }
  
  useEffect(() => {
    getdata()
    console.log(idArray)
  },[])

  return (
    <>
    <Navbar />
    <Card />
    </>
    
  )
}

export default Admin_land