import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'

const AdminLand = () => {

  const [idArray, setIdArray] = useState([]) 
  
  const getdata = async() => {

    const response = await fetch("http://localhost:6100/api/admin/getall", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const json = await response.json()

    if(json.success)
    {
      
      const newIdArray = json.data.map(item => item._id);
      setIdArray(newIdArray)
      console.log(newIdArray)
    }
  }
  
  useEffect(() => {
    getdata(); 
  },[idArray])

  return (
    <>
    <Navbar />
    {idArray.map((id) => <Card key={id} mentid={id} />)}
    </>
  )
}

export default AdminLand
