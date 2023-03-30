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
      for(var i=0;i<json.data.length;i++)
      {
        idArray.push(json.data[i]._id)
      }
      
      console.log(idArray)
    }
  }
  
  useEffect(() => {
    getdata()
  },[])

  return (
    <>
    <Navbar />
    {
      idArray.map((ment) => {
        <Card mentid={ment}/> 
        console.log("Hey",ment)
      })  
    }
    </>
    
  )
}

export default Admin_land