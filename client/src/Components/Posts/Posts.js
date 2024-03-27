import React from 'react';
import {useSelector} from 'react-redux';
import {CircularProgress, Grid } from '@mui/material'
import Post from './Post/Post';

const Posts = ({setCurrId}) => {

  const {posts,isLoading}= useSelector((state)=> state.posts);
  console.log(posts);


  return (
    !posts.length ? <CircularProgress /> : (
        <Grid container spacing={3}>
          {posts.map((post)=>(
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4} spacing={3}>
              <Post setCurrId={setCurrId} post={post}/>
            </Grid>
          ))}
        </Grid>
    )
  )
}

export default Posts;