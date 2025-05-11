import { createContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import RequireAuth from './Auth/RequireAuth/RequireAuth';
import { auth } from './Firebase/Firebase.config';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login/Login';
import SignUp from './Pages/Login/SignUp/SignUp';
export const AuthContext = createContext(null)
function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [user, loading] = useAuthState(auth);


  useEffect(()=>{
      if(user?.uid){
          setIsAuth(true)
      }else{
          setIsAuth(false)
      }
  }, [user])

  return (
    <>
    <Toaster />
    <AuthContext.Provider value={{user, loading, isAuth,setIsAuth}}>
    <Routes>
        <Route path='/' element={<RequireAuth><Home /></RequireAuth>} />
        <Route path='/home' element={<RequireAuth><Home /></RequireAuth>} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
    </Routes>
    </AuthContext.Provider>
    </>
  );
}

export default App;
