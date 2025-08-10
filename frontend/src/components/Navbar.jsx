import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GiSevenPointedStar } from "react-icons/gi";
import { FaUserCheck } from "react-icons/fa";
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, setShowLogin,credits, logout} = useContext(AppContext);   

    return (
        <div className='flex items-center justify-between py-4'>
            <Link to='/' className='flex items-center font-medium text-2xl'>
                <img width={60} src="./logo2.png" alt="" className='' />Imagify
            </Link>

            <div>
                {
                    user ?
                    <div className='flex items-center gap-2 sm:gap-3 '>
                    <button className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-[1.5] sm:py-3 rounded-full hover:scale-105 transition-all duration-700 '>
                        <GiSevenPointedStar className='w-10' />
                                <p className='text-xs sm:text-sm font-medium text-gray-600 '> Credits Left : {credits}</p></button>
                            <p className='text-xs sm:text-sm font-medium text-gray-600 max-sm:hidden pl-4'>Hi, {user.username}</p>

                    <div className='relative group'>
                        <FaUserCheck className='drop-shadow-sm' />
                        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black  rounded pt-12'>
                            <button onClick={logout} className='m-0 p-2 bg-white  text-sm'>Logout</button>
                           <button onClick={()=>navigate('/gallery')} className='m-0 p-2 bg-white  text-sm'>Gallery</button>

                        </div>
                    </div>

                </div>
                         
                        :
                        <div className='flex items-center gap-2 sm:gap-5'>
                            <p onClick={() => navigate('/purchase')} className='cursor-pointer'>Pricing</p>
                            <button className='bg-zinc-800 text-white py-2 px-7 sm:px-10 text-sm rounded-full'
                            onClick={()=>setShowLogin(true)}
                            >Login</button>
                        </div>
                        
                }


            </div>

        </div>
    )
}

export default Navbar