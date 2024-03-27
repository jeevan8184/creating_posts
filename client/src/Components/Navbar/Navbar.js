import React,{useState,useEffect} from 'react';
import {Paper,Button, Avatar, Grid, Typography} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {deepPurple } from '@mui/material/colors';
import {useDispatch} from 'react-redux';
import {LOGOUT} from '../../constants/index';
import {jwtDecode} from 'jwt-decode';

const Navbar = () => {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  
    const handleLogOut=()=> {
      dispatch({type:LOGOUT})
      navigate('/');
      setUser(null);
    }

    useEffect(()=> {
      const token=user?.token;
      if(token) {
        const decodedToken=jwtDecode(token);
        if(decodedToken.exp*1000<new Date().getTime()) handleLogOut();
      }
      setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

  return (
    <div className='lg:mx-20 mx-1'>
        <Paper className='px-8 py-4 m-6 mx-auto flex justify-between max-sm:flex-col' elevation={4}>
          <div className=''>
            <h1 className=' text-sky-400 font-bold text-4xl'>MEMORIES</h1>
          </div>
          <div className=''>
            {user ? (
              <div className='flex flex-row gap-4'>
                   <Avatar src={user?.result?.imageUrl} alt={user?.result?.name}
                    className='flex items-center justify-center mr-6'
                  sx={{bgcolor:deepPurple[500]}}
                 >
                  {user?.result?.name.charAt(0)}
                 </Avatar>
                 <Typography variant='h5' >{user?.result?.name}</Typography>
                 <Button variant='contained' onClick={handleLogOut}>Logout</Button>
              </div>
            ): (
              <Button variant='contained' onClick={()=> {
                navigate('/login')
              }}>Login</Button>
            )}
          </div>
        </Paper>
    </div>
  )
}

export default Navbar