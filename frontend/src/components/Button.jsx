import { motion } from 'motion/react'
import React, { useContext } from 'react'
import { GiKnockedOutStars } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Button = () => {
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
      initial={{opacity:0.2, y:100}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once:true }}
      transition={{duration:1}}
          className='pb-16 text-center '>
          <h1 className='text-2xl mf:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16 '>See The Magic, Try Now</h1>
          <button
              onClick={generateHandler}
              className='sm:text-lg text-white bg-black m-auto mt-8 px-12 py-3 inline-flex items-center gap-2 rounded-full hover:scale-105 transition-all duration-500'>Generate Images
              <GiKnockedOutStars className='text-yellow-400 text-2xl' />
          </button>
      </motion.div>
  )
}

export default Button