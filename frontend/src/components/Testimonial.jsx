import { motion } from 'motion/react';
import React from 'react'

import { FaStar } from "react-icons/fa6";

const testimonialData = [
    {
        img: "https://i.pinimg.com/originals/25/41/6b/25416bef3ed941310a877484cea1a20b.png",
        name: 'Donald Jackma',
        role: ' Graphic Designer',
        stars: 5,
        text: `I have been using imagify for two years, primarily for Instagram, and its has incredibly user-friendly, making my work much easier. `
    },
    {
        img: "https://i.pinimg.com/originals/c9/de/1b/c9de1b5ffc89390ca8cab305ed4fecf9.png",
        name: 'John Doe',
        role: 'Digital Artist',
        stars: 5,
        text: `I have been using imagify for two years, primarily for Instagram, and its has incredibly user-friendly, making my work much easier. `
    },
    {
        img: "https://i.pinimg.com/originals/25/41/6b/25416bef3ed941310a877484cea1a20b.png",
        name: 'Angelina Wion',
        role: ' CEO of WION',
        stars: 5,
        text: `I have been using imagify for two years, primarily for Instagram, and its has incredibly user-friendly, making my work much easier. `
    },

]
const Testimonial = () => {
    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once:true }}
            transition={{ duration: 1 }}
            className='flex flex-col items-center justify-center my-20 py-12'>
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Customer testimonials</h1>
            <p className='text-gray-500 mb-12 '>What Our Users Have To Say</p>

            <div className='flex flex-wrap gap-6'>
                {
                    testimonialData.map((item, index) => (
                        <div key={index} className='bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer duration-500 hover:scale-[1.02] transition-all  '>
                            <div className='flex flex-col items-center'>
                                <img src={item.img} alt="" className='rounded-full w-14 h-14 object-cover' />

                                <h2 className='text-xl font-semibold mt-3'>{item.name}</h2>
                                <p className='text-gray-500 mb-4 '>{item.role}</p>

                                <div className='flex mb-4 '>
                                    {Array(item.stars).fill().map((star, index) => (
                                        <FaStar key={index} className='text-yellow-300' />
                                    ))}
                                </div>
                                <p className='text-center text-sm text-gray-600'>{item.text}</p>

                            </div>
                        </div>
                    ))}
            </div>
        </motion.div>
    )
}

export default Testimonial