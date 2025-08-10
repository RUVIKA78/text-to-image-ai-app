import React from 'react'
import { BsPencilFill } from "react-icons/bs";
import { FaMagic } from "react-icons/fa";
import { RiDownloadCloud2Fill } from "react-icons/ri";
import { motion } from 'motion/react';

 const stepsData = [
    {
        title: "Describe Your Vision",
        description: "Type a phrase, sentence, orparagraph that describes the image you want to create.",
        icon:<BsPencilFill/>,
    },
    {
        title: "Watch The Magic",
        description: "Our AI-Powered engine will transform your text into a high-quality, unique image in seconds.",
        icon:<FaMagic/>
    },
    {
        title: "Download And Share",
        description: "Instantly dowload your creation or share it with the worl directly from our platform.",
        icon:<RiDownloadCloud2Fill/>
    }

]
const Steps = () => {
  return (
      <motion.div
          initial={{ opacity: 0.2, y: 100 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{once:true}}
          className='flex items-center justify-center my-32 flex-col'>
          <h1 className='text-3xl sm:text-4xl font-semibold mb-2 '>How it Works</h1>
          <p className='text-gray-600 text lg mb-8'>Transform your words into Reality</p>

          <div className='space-y-4 w-full max-w-3xl text-sm'>
              {stepsData.map((item, index) => (
                  <div key={index}
                      className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg'
                  >
                     <div className='text-xl'> {item.icon}</div>
                      <div>
                          <h2 className='text-xl font-medium'>{item.title}</h2>
                          <p className='text-gray-500'>{item.description}</p>
                      </div>
                </div>
              ))}
          </div>
    </motion.div>
  )
}


export default Steps