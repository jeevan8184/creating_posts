import React, { useState } from 'react'
import {Avatar, Button, Container, Grid, Grow, Paper, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Input from './Input';
import {gapi} from 'gapi-script'
import {GoogleLogin} from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import { LOGIN } from '../../constants';

const Auth = () => {

  window.gapi.load('client:auth2', () => {
    window.gapi.client.init({
      clientId:"358711883049-abvm49ld21vijg193ljn83f6b4nf55hu.apps.googleusercontent.com",
        plugin_name: "chat"
  })})

  const initState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''};
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [isSignup,setIsSignup]=useState(true);
  const [formData,setFormData] = useState(initState);
  const [showPass,setShowPass]=useState(false);
  
  const handleChange=(e)=> {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit=(e)=> {
    e.preventDefault();
    if(isSignup) {
       dispatch(signup(formData,navigate))
    } else {
      dispatch(signin(formData,navigate));
    }
  }

  const handleShowPass=()=> {
    setShowPass((prevPass)=> !prevPass);
  }

  const handleLogin=()=> {
    setIsSignup((prevSign)=> !prevSign)
  }

  const handleSuccess=async(res)=> {

    const result=res?.profileObj;
    const token=res?.tokenId;
    try {
      dispatch({type:LOGIN,data:{result,token}});
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleFailure=(err)=> {
    console.log(err);
  }

  return (
    <Container maxWidth='xs' component='main'>
      <Paper elevation={3} className='flex flex-col items-center p-5 gap-1'>
        <Avatar style={{backgroundColor:'red'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up':'Sign In'}</Typography>
      <form onSubmit={handleSubmit} className=''>
        <Grid className='flex-col gap-3' container >
          <Grid className='flex gap-2 ' item>
            {isSignup && (
              <>
                <Input  name='firstName' handleChange={handleChange} label='firstName' type='text' autoFocus/>
                <Input  name='lastName' handleChange={handleChange} label='lastName'  type='text' />
              </>
            )}
          </Grid>
          <Input name='email' handleChange={handleChange}  label='Email'  type='email' fullWidth />
          <Input name='password' handleChange={handleChange} label='Password' fullWidth handleShowPass={handleShowPass} type={showPass ? 'text':'password'}/>
          {isSignup && (
            <Input name='confirmPassword' handleChange={handleChange} label='confirm password'  type='text' fullWidth/>
          )}
          <GoogleLogin clientId='358711883049-abvm49ld21vijg193ljn83f6b4nf55hu.apps.googleusercontent.com'
            render={(renderProps)=> (
              <Button fullWidth variant='contained' onClick={renderProps.onClick} className='gap-2'> <GoogleIcon  fontSize='medium'/> Google Login</Button>              
            )}
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            cookiePolicy='single_host_origin'
          
          />
            
          <Button type='submit' fullWidth variant='contained'>{isSignup ? 'Signup':'Signin'}</Button>
          <Button type='button' className='' onClick={handleLogin}>
            {isSignup ? 'Already have an account Signin' : 'Dont have an account sign up'}
          </Button>
        </Grid>
      </form>
      </Paper>
    </Container>
  )
}

export default Auth