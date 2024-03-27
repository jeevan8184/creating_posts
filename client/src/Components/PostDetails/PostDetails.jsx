import React, { useEffect } from 'react'
import { Card, CardMedia, CircularProgress, Container, Divider, Grid, Paper, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { getPost, getPostsBySearch } from '../../actions'
import moment from 'moment';
import CommentSec from './CommentSec'

const PostDetails = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const {posts,post,isLoading}=useSelector((state)=> state.posts);
    
    useEffect(()=> {
        if(id) {
            dispatch(getPost(id));
        }
    },[id,dispatch]);

    useEffect(()=> {
       dispatch(getPostsBySearch({search:'none',tags:post?.tags.join(',')}));
    },[post,dispatch]);

    if(!post) return null;

    if(isLoading) {
        return (
            <Paper elevation={6} className='flex items-center justify-center p-8'>
                <CircularProgress size='7em' />
            </Paper>
        )
    }

    const recommendedPosts=posts.filter(({_id})=>_id !==post._id);

    const openPost=(id)=> {
        navigate(`/newPosts/${id}`);
    }

  return (
    <Paper elevation={6} className='m-8 p-2 lg:p-8 gap-5'>
        <div className='sm:flex'> 
            <div className='flex flex-col gap-3 max-w-screen-md mb-4'>
                <Typography variant='h4'>{post.title}</Typography>
                <Typography variant=''>{post.tags.map((tag)=> `#${tag} `)}</Typography>
                <Typography variant='body1'>{post.message}</Typography>
                <Typography variant='body'>Created At : {moment(post.createdAt).fromNow()} </Typography>
                <Divider />
                <CommentSec  post={post}/>
            </div>
            <img src={post?.selectedFile} alt='selectedFile' className=' h-[500px] w-[400px] lg:w-[500px] rounded-lg object-contain flex flex-end mb-8' />
        </div>
        <div className='w-full'>
                <Typography variant='h5' component='h1'>RecommendedPosts</Typography>
                <div className='flex flex-wrap gap-4'>
                    {recommendedPosts.map((post,idx)=> (
                        <div className=' cursor-pointer border rounded w-72 shadow-md overflow-hidden' onClick={()=>openPost(post._id)} key={idx}>
                            <img alt='post' src={post.selectedFile} className='h-48 w-full  object-cover' />
                            <div className='p-4'>
                                <Typography variant='h6' >{post.title}</Typography>
                                <Typography variant='subtitle2' >{post.message}</Typography>
                                <Typography className='text-gray-600 mb-2' gutterBottom><strong>created At: </strong>{moment(post.createdAt).fromNow()}</Typography>
                                <Typography variant='text-gary-600'><strong>Likes : </strong>{post.likes.length}</Typography>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    </Paper>
  )
}

export default PostDetails