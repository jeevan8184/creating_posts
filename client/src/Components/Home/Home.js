import React, {useEffect, useState } from 'react'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import { Button, Chip, Container, Grid, Grow, Paper, TextField, Typography } from '@mui/material'
import { getPosts, getPostsBySearch } from '../../actions'
import { useDispatch } from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import Paginate from '../Paginate'

function useQuery () {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const query=useQuery();
  const page=query.get('page') || 1;
  const searchQuery=query.get('searchQuery');

  const [currId, setCurrId] = useState('');
  const [chips, setChips] = useState([]);
  const [initVaue,setInitValue]=useState('');
  
  const [searchTerm,setSearchTerm]=useState('');
  
  // useEffect(()=> {
  //   dispatch(getPosts());
  // },[dispatch])

  const handleAddChip=()=> {
    setChips([...chips,initVaue]);
    setInitValue('');
    handleSubmit();
  }
  const handleRemoveChip=(delChip)=> {
    setChips((chips)=> chips.filter((chip)=>chip !==delChip))
    handleSubmit();
  }

  const handleSubmit=()=> {
    if(searchTerm.trim() || chips) {
      dispatch(getPostsBySearch({search:searchTerm,tags:chips.join(',')}))
      navigate(`/newPosts/search?searchQuery=${searchTerm || 'none'}&tags=${chips.join(',')}`)
    }else {
      navigate('/');
    }
    if(!searchTerm.trim() && !chips) {
      navigate('/');
    }
  }

  
  return (
    <Grow in maxWidth='1440px'>
      <Container maxWidth='xl' className=' mb-5'>
        <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
           <Grid item xs={12} sm={6} md={8}>
              <Posts setCurrId={setCurrId} />
           </Grid>
           <Grid item xs={12} sm={8} md={3.8} className=''>
                <Paper elevation={6} className='p-4 gap-2'>
                  <Grid container className='gap-2'>
                    <Typography variant='h6'>Search Memories</Typography>
                    <TextField value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} fullWidth variant='outlined' label='search memories' />
                    <TextField value={initVaue} 
                      label="search tags"
                      placeholder="search tags separated with (',') "
                      onChange={(e)=>setInitValue(e.target.value)}
                      onKeyDown={(e)=>e.key==='Enter' && handleAddChip()}
                      fullWidth
                    />
                     {chips.map((chip,idx)=> (
                      <Chip key={idx}
                        label={chip}
                        onDelete={()=>handleRemoveChip(chip)}
                      />
                    ))}
                    <Button variant='contained' onClick={handleSubmit} fullWidth>search</Button>
                  </Grid>
                </Paper>
              <Form setCurrId={setCurrId} currId={currId} />
              {!searchQuery && !chips.length && (
                <Paper elevation={6}>
                   <Paginate page={page} />
                </Paper>
              )}
           </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home;