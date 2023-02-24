import React from 'react'

const Signup = () =>{
    return(
        <>
        <label for="name"> Enter your name : </label>
        <input type="text" name="name" placeholder="Name" />
        <label for="username"> Enter your username : </label>
        <input type="text" name="username" placeholder="Username" />
        <label for="password"> Enter your Password : </label>
        <input type="text" name="password" placeholder="Password" />
        </>
    )
}

export default Signup