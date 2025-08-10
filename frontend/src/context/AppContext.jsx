import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState();
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState("");
    const [credits, setCredits] = useState()
    const [error, setError]=useState("")
    const navigate = useNavigate()

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const fetchUserImages = async () => {
        if (!token) return
        try {
            const { data } = await axios.get(`${backendUrl}/image/get-images`, { headers: { token } });
            return data.images;
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch user images");
            return [];
        }
    };
    const localCreditsData = async () => {
        if (!token) return
        try {
            const { data } = await axios.get(`${backendUrl}/user/credits`, { headers: { token } })
            if (data.success) {
                setCredits(data.credits);
                setUser(data.user);

            }
        } catch (error) {
            console.log(error);

            toast.error(error.message)
        }
    }

    const generateImage = async (prompt) => {
        if (!token) return
        if(credits ===0 ) navigate('/purchase')
        try {
            const { data } = await axios.post(`${backendUrl}/image/generateimage`, { prompt }, { headers: { token } })
            // console.log(data);
            localCreditsData();

            if (data.credits === 0) {
                toast.error(data.message);
                navigate('/purchase')

            }

           else if (data.success) {
                localCreditsData();
                return data.resultImage;
            }
            // else {

            //     toast.error(data.message);
            //     console.log(data)
            //     localCreditsData();
            //     if (data.credits === 0) {
            //         navigate('/purchase')
            //     }
            // }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    useEffect(() => {
        if (token) {
            localCreditsData();
            fetchUserImages()
        }
    }, [token])

    const logout = () => {

        localStorage.removeItem('token');
        navigate('/');
        setToken('');
        setUser(null);
        toast.info("Logged Out")


    }
    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token, setToken,
        credits, setCredits,
        localCreditsData,
        logout,
        generateImage,
        fetchUserImages

    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider