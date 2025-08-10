const ImageContainer = ({src}) => {
    return (
        <div  className='bg-white/20  rounded-lg shadow-md border w-64 m-auto cursor-pointer duration-500 hover:scale-[1.02] transition-all'>
            <img className='w-full h-full object-cover' src={src} alt="" />
        </div>

    )
}

export default ImageContainer