import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'


const plans = [
  {
    id: 'Basic',
    price: 10,
    credits: 5,
    desc:'Best for personal use.'
  },
  {
    id: 'Advanced',
    price: 50,
    credits: 30,
    desc:'Best for Business use.'
  },
  {
    id: 'Premium',
    price: 250,
    credits: 300,
    desc:'Best for Organization use.'
  },
]

const Purchase = () => {
  const { user,token,localCreditsData, setShowLogin, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  
  const initpay = async (order)=> {
    const options = {
      key: import.meta.env.VITE_RAZOR_PAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credits Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (res) => {
        try {
            const {data}=await axios.post(`${backendUrl}/user/verifypayment`, res, {header:{token}})          
          if (data.success) {
            localCreditsData();
            navigate('/');
          }

          toast.success('Credits Added')
        } catch (error) {
          console.log(error);
          toast.error(error.message);
          
        }
        
      }
      
    }

    const rzp = new window.Razorpay(options)
    rzp.open();
  }
  const payment = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        // navigate('/login');
      }
      const { data}=await  axios.post(`${backendUrl}/user/payment`,{planId}, {headers:{token}})
    
      if (data.success) {
        initpay(data.order)
        toast.success(data.message)
        
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <motion.div
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{once:true}}
      className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>OUR PLANS</button>

      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>
      <div className='flex flex-wrap justify-center text-left gap-6'>
        {plans.map((plan, index) => (
          <div key={index} className='bg-white drop-shadow-sm rounded-lg py-12 border px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
            <p className='mt-3 mb-1 font-semibold'>{plan.id}</p>
            <p className='text-sm '>{plan.desc}</p>
            <p className='mt-6 '><span className='text-3xl font-medium '>$ {plan.price}</span> / {plan.credits} credits</p>
            
            <button onClick={()=>payment(plan.id)} className='bg-gray-800 text-white mt-8 text-sm py-2.5 rounded-md min-w-52 w-full'>{user ? "Purchase" : "Get Started" }</button>
            </div>
        ))}
    </div>
    </motion.div>
  )
}

export default Purchase