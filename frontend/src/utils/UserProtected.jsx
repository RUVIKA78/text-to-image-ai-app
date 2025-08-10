import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const UserProtected = ({ children }) => {
    const { token } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            toast.error("Please Login To Continue")
            navigate('/')  // redirect to home or login page
        }
    }, [token, navigate])

    if (!token) return null
    return (
        <div>{children}</div>
    )
}

export default UserProtected