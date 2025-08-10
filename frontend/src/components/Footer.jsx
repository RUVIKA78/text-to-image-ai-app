import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


const Footer = () => {
  return (
      <div className='flex justify-between items-center py-3 gap-4 mt-20'>
          <img src="./logo2.png" alt="logo" width={50} />
          <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @Vrutika | All rights are reserved.</p>

          <div className='flex gap-2.5 text-2xl '>
              <FaFacebook />
              <FaTwitter />
              <FaLinkedin/>
          </div>
    </div>
  )
}

export default Footer