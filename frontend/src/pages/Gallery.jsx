import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import ImageContainer from '../components/ImageContainer'
import { AppContext } from '../context/AppContext'

const Gallery = () => {
    const { fetchUserImages } = useContext(AppContext)
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadImages = async () => {
            setIsLoading(true);
            const imgs = await fetchUserImages()
            // console.log(imgs)
            if (imgs) setImages(imgs);
            setIsLoading(false);
        };
        loadImages()
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='min-h-[80vh] text-center pt-14 mb-10'>
            <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>MY IMAGES</button>
            {isLoading ? (
                <p className="text-black">Loading...</p>
            ) : images.length > 0 ? (
                images.map((img, index) => (
                    <ImageContainer key={index} src={img} />
                ))
            ) : (
                <p className="">No images available.</p>
            )}

        </motion.div>
    )
}

export default Gallery