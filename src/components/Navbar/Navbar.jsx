import React from 'react'
import logo from "../../assets/CoachX.svg"
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className='logo'>
        <img src={logo} alt="CoachX Logo" />
    </div>
  )
}

export default Navbar