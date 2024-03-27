
import Home from './Components/Home/Home'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Auth from './Components/Auth/auth'
import { useEffect, useState } from 'react';
import PostDetails from './Components/PostDetails/PostDetails';


function App() {

  const newUser=JSON.parse(localStorage.getItem('profile'));
  const [user,setUser]=useState(false);

  useEffect(()=> {
    if(newUser) {
      setUser(true);
    } else {
      setUser(false);
    }
  },[newUser]);

  return (
    <div className="">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' exact element={<Navigate to='/newPosts' />} />
          <Route path='/newPosts' exact element={<Home />} />
          <Route path='/newPosts/search' eaxct element={<Home />} />
          <Route path='/newPosts/:id' exact element={<PostDetails />} />
          <Route path='/login' exact element={user ? <Navigate to='/newPosts'/> : <Auth /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
