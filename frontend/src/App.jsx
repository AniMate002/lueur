import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/auth/signup/SignUpPage'
import LogInPage from './pages/auth/login/LogInPage'
import HomePage from './pages/home/HomePage'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import Logo from '../public/logo.png'
import ProfilePage from './pages/profile/ProfilePage'
import Header from './pages/components/layout/Header'
import LeftSideBar from './pages/components/layout/LeftSideBar/LeftSideBar'
import RightSideBar from './pages/components/layout/RightSideBar/RightSideBar'

function App() {

  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try{
        const res = await fetch("/api/auth/me")
        const data = await res.json()

        if(data.error) throw new Error(data.error)
        console.log("Auth is here", data)
        // toas.success("Account created successfully")

        return data

    }catch(e){
        // toast.error(e.message)
        console.log(e.message)
        throw new Error(e)
    }
    },
    retry: false
  }) 



  if(isLoading){
    return (
      <div className='w-[100vw] h-[100vh] bg-black flex items-center justify-center flex-col'>
        <img src={Logo} alt="logo" className='w-[400px]'/>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    )
  }

  return (
    <div className='text-white open-sans-my bg-[rgb(18,19,26)] w-[100vw] h-[100vh] overflow-hidden'>
      {authUser ? <Header /> : ""}
      <div className='flex h-fit'>
        <LeftSideBar />
        <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to={'/login'}/>}/>
          <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={'/'}/>}/>
          <Route path='/login' element={!authUser ? <LogInPage /> : <Navigate to={'/'}/>}/>
          <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <LogInPage />}/>
        </Routes>
        <RightSideBar />
      </div>
      <Toaster />
    </div>
  )
}

export default App
