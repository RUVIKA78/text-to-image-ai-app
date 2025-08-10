import React, { useContext } from 'react'
import { FaStar } from "react-icons/fa6";
import { GiKnockedOutStars } from "react-icons/gi";
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
const imgArrays = [
    "./hero1.jpg",
    "./hero2.jpg",
    "./hero3.jpg",
    "./hero4.jpg",
    "./hero5.jpg",
    "./hero6.jpg",
    
]
const Header = () => {
    const { user, setShowLogin } = useContext(AppContext);
    const navigate = useNavigate();

    const generateHandler = () => {
        if (user) {
            navigate('/createdashboard');
        } else {
            setShowLogin(true);
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{once:true}}
            className='flex flex-col justify-center items-center text-center my-20'>
            
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay:0.2 }}
                animate={{ opacity: 1, y: 0 }}

                className='text-stone-500 inline-flex items-center text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>
                <p>Best text to image generator</p>
                <FaStar className='text-yellow-400' />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{delay:0.4, duration:2}}
                className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>Turn Text To <span className='text-blue-600'>Image</span>, in seconds.</motion.h1>

            <motion.p
            initial={{ opacity: 0, y:20 }}
            animate={{ opacity: 1, y:0 }}
            transition={{delay:0.6, duration:0.8}}
                className='text-center max-w-xl mx-auto mt-5'>Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen.</motion.p>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{default: {duration:0.5}, opacity:{delay:0.8, duration:1}}}
                
                onClick={generateHandler}
                className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'>Generate Images
                <GiKnockedOutStars className='text-yellow-400 text-2xl' />
            </motion.button>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{delay:1, duration:1}}
                className='flex flex-wrap justify-center mt-16 gap-3'>
                
                {imgArrays.map((src, index) => (
                    <motion.img
                        whileHover={{ scale: 1.05, duration: 0.1 }}
                        
                        className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={src} alt={`Image ${index + 1}`} key={index} width={90} />
                ))}
            </motion.div>
            <motion.p
                initial={{opacity:1}}
                animate={{ opacity: 1 }}
                transition={{delay:1.2,duration:0.8}}
                className='mt-2 text-neutral-600'>Generated images from Imagify</motion.p>
        </motion.div>
    )
}

export default Header