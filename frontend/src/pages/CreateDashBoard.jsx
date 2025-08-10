import { motion } from 'motion/react';
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
const CreateDashBoard = () => {
  const [image, setImage] = useState('./logo.png');
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [input, setInput] = useState("");

  const { generateImage }=useContext(AppContext);
  const formHandler = async(e) => {
    e.preventDefault();
    setLoading(true);
    if (input) {
      const image = await generateImage(input);
      // console.log(image);
      
      if (image) {
        setImage(image);
        setImageLoading(true);
       
      }
    }
    setLoading(false);

  }

  return (
    <motion.div
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{once:true}}
      className='flex flex-col justify-center items-center min-h-[90vh] relative'>
      <div className='relative'>
        <img
          src={image}
          width={350} alt="generated image" className='max-w-sm rounded' />
        <span className={`absolute bottom-0 left-0 h-1 bg-blue-500/25 ${loading ? 'w-full transition-all duration-[10s]':'w-0' }`} />
      </div>
     
            <p className={!loading ? 'hidden' :' '}>Loading...</p>

      

      <div className=''>
        {!imageLoading &&
          <form onSubmit={formHandler} className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full' action="">
            <input onChange={(e)=>{setInput(e.target.value)}} value={input}
              className='bg-transparent outline-none max-sm:w-20 ml-8 placeholder-zinc-300'
              placeholder='write your imagination and see magic' type="text" />
            <button
              type='submit' className='bg-zinc-900 px-10 py-3 rounded-full sm:px-16'>Generate</button>
          </form>
        }

        {imageLoading &&
        <div className='flex gap-2 flex-wrap justify-center text-white p-0.5 text-sm rounded-full mt-10 '>
        <p onClick={()=>{setImageLoading(false)}} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
        <a className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer' download href={image}>Download</a>
      </div>
        }
        
      </div>



    </motion.div>
  )
}

export default CreateDashBoard