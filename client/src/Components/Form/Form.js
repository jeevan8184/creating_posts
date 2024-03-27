
import React, { useEffect, useState } from 'react';
import { Paper,Button,TextField, Typography, Container, Grow, Grid } from '@mui/material';
import FileBase from 'react-file-base64'
import { createPost, updatePost } from '../../actions';
import {useDispatch, useSelector} from 'react-redux';

const Form = ({setCurrId,currId}) => {
  const dispatch=useDispatch();
  const inState={creator:'',title:'',selectedFile:'',message:'',tags:''}
  const [formData, setFormData] = useState(inState);

  const post=useSelector((state)=> currId ? state.posts.posts.find((p)=>p._id===currId) : null)
  
  useEffect(()=> {
    if(post) {
      setFormData(post);
    }
  },[post])

  const handleChange=(e)=> {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit=(e)=> {
    e.preventDefault();
    if(currId) {
      dispatch(updatePost(currId,formData));
    } else {
      dispatch(createPost(formData));
    }
    handleClear();
  }
  
  const handleClear=()=> {
    setCurrId(null);
    setFormData({creator:'',title:'',selectedFile:'',tags:'',message:''});
  }
  return (
        <Paper className='p-4 gap-2' elevation={6}>
         <form className='' noValidate autoComplete='off' onSubmit={handleSubmit}>
         <Grid className='gap-2' container >
            <Typography variant='contained' className='font-medium text-2xl my-3'>{post ? 'Editing':'Creating'} a Memory</Typography>
            {/* <TextField variant='outlined' label='Creator' name='creator'  type='text' value={formData.creator} onChange={handleChange} fullWidth /> */}
            <TextField variant='outlined' label='title'   name='title'    type='text' value={formData.title} onChange={handleChange} fullWidth/>
            <TextField variant='outlined' label='message' name='message'  type='text' value={formData.message} onChange={handleChange} fullWidth multiline/>
            <TextField variant='outlined' label='tags'    name='tags'     type='text' value={formData.tags} onChange={(e)=>setFormData({...formData,tags:e.target.value.split(',')})} fullWidth/>
            <div className=''>
              <FileBase type='file' multiple={false} onDone={({base64})=> {
                  console.log('selectedFile',base64);
                  setFormData({...formData,selectedFile:base64})
              }} />
            </div>
            <Button variant='contained' fullWidth color='primary' margin='10px' type='submit'>submit</Button>
            <Button variant='contained' fullWidth color='error' margin='10px' onClick={handleClear}>clear</Button>
          </Grid>
          </form>
        </Paper>
  )
}

export default Form