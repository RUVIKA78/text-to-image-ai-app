import React, { useContext } from 'react'
import Purchase from './pages/Purchase'
import CreateDashBoard from './pages/CreateDashBoard'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Gallery from './pages/Gallery'
import UserProtected from './utils/UserProtected'
const App = () => {
  const { showLogin, token } = useContext(AppContext);
  return (


    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50 '>
      <ToastContainer
        position='bottom-right'
      />
      <Navbar />
      {showLogin && <Login />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/purchase' element={<Purchase />} />
        <Route path='/createdashboard' element={<UserProtected>

          <CreateDashBoard />
        </UserProtected>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/gallery' element={
          <UserProtected>

            <Gallery />
          </UserProtected>
        }
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App