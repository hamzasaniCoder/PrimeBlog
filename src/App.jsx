import { useDispatch } from 'react-redux'
import './App.css'
import { useState, useEffect } from 'react'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"


function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL)

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        dispatch(login({userData}))
      } else {
          dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  }, [])
  
  return !loading ? (
      <div className=''>
        <div className=''>

        </div>
      </div>
  ) : null;

}

export default App
