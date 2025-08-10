import React, { useContext, useEffect, useState } from 'react'
import { FaUserLarge } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import axios from "axios"
import { toast } from 'react-toastify';

const Login = () => {
    const [state, setState] = useState('Login');
    const { setShowLogin,backendUrl,setToken, setUser, error, setError } = useContext(AppContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPasswrd] = useState("");
    // console.log(backendUrl);
    
    const formHandle = async(e) => {
        e.preventDefault();
        try {
            if (state==='Login') {
                const { data }=await axios.post(`${backendUrl}/user/login`, { email, password });
                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                    toast.success(data.message)

                }
                else {
                    console.log(error);
                    setError(error.response.message)
                    toast.error(error);  
                }
            }
            else {
                const { data }=await axios.post(`${backendUrl}/user/signup`, {username, email, password });
                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                    toast.success(data.message)
                }
                else {
                    console.log(error);
                    
                    toast.error(data.error);  
                }
            }


        } catch (error) {            
            toast.error(error.response.data.message);  

        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])


    return (
        <div
            className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center '>
            <motion.form onSubmit={formHandle}
             initial={{opacity:0.2, y:50}}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once:true }}
                transition={{ duration: 0.3 }}
                className='relative bg-white p-10 rounded-xl text-slate-500 ' action="">
                <h1 className='text-2xl text-center text-neutral-700 '>{state}</h1>
                <p className='text-sm'>Welcome Back, Please signin to continue.</p>

                {
                    state !== 'Login' &&
                    <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                        <FaUserLarge /><input onChange={e=>{setUsername(e.target.value)}} value={username} className='outline-none text-sm ' name="username" type="text" placeholder='Full Name' required />

                    </div>
                }
                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>

                    <MdEmail /><input onChange={e=>{setEmail(e.target.value)}} value={email} className='outline-none text-sm ' name="email" type="email" placeholder='Email' required />
                </div>
                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>

                    <FaLock /><input onChange={e=>{setPasswrd(e.target.value)}} value={password} className='outline-none text-sm ' name="password" type="password" placeholder='Password' required />
                </div>
                <p className='cursor-pointer text-sm text-blue-600 my-4'>Forgot Password? </p>
                <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full'>{state==='Login' ? 'Login':'Create Account' }</button>

                {state==='Login' ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign Up')}>Sign Up</span></p>
                    :
                    <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Login')}>Login</span></p>

 }
                <IoClose onClick={()=>setShowLogin(false) } className='cursor-pointer absolute top-5 right-5' />

            </motion.form>
        </div>
    )
}

export default Login