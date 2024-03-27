import React, { useState } from 'react';
import { Card,CardActionArea,CardContent,CardMedia,CardActions, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import  MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import moment from 'moment'
import {useDispatch} from 'react-redux';
import { deletePost, likePost } from '../../../actions/index';
import { useNavigate } from 'react-router-dom';

const Post = ({setCurrId,post}) => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=JSON.parse(localStorage.getItem('profile'));
  const userId=user?.result?.googleId || user?.result?._id;
  const [likes, setLikes] = useState(post?.likes);
  const hasLikedPost=post?.likes?.find((id)=> id===userId);

  const handleLike=()=> {
    dispatch(likePost(post._id));
    if(hasLikedPost) {
      setLikes(post.likes.filter((id)=>id !==userId));
    }else {
      setLikes([...post.likes,userId]);
    }
  }

  const Like=()=> {
    if(likes.length>0) {
       return likes.find((id)=> id===userId) ? (
        <><ThumbUpAltIcon /> {likes.length>2 ? `You and ${likes.length-1} others`: `${likes.length} like${likes.length >1 ? 's':''}` } </>
       ) : (
        <> <ThumbUpOffAltIcon /> {`${likes.length} like${likes.length >1 ? 's':''}`} </>
       )
    }else {
     return <> <ThumbUpOffAltIcon /></>
    }
  }

  const openPost=()=> {
    navigate(`/newPosts/${post._id}`)
  }
  
  return (
      <Card elevation={3} className='relative flex flex-col justify-between h-full rounded-3xl'>
      <CardActionArea onClick={openPost}>
        <CardMedia image={post.selectedFile} title={post.title} className='bg-black bg-opacity-50 bg-blend-darken  pt-[56.25%]' />
        <div className='absolute top-5 left-5  text-gray-100'>
          {/* <Typography variant='h5'>{post.creator}</Typography> */}
          <Typography>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className='a absolute top-5 right-5 text-gray-200'>
          {userId===post.creator && (
              <Button style={{color:'white'}} onClick={(e)=> {
                e.stopPropagation();
                setCurrId(post._id);
              }}>
                <MoreHorizIcon fontSize='large'/>
              </Button>
          )}
        </div>
        <div className=''>
          {post.tags.map((tag)=> `#${tag}` )}
        </div>
        <CardContent>
          <Typography variant='h5'>{post.title}</Typography>
          <Typography variant='body2'>{post.message}</Typography>
        </CardContent>
        </CardActionArea>
        <CardActions className='flex justify-between'>
           <Button type='button' onClick={handleLike} className=' gap-1 flex items-center justify-center'>
             <Like />
           </Button>
           {userId===post.creator && (
              <Button type='button' onClick={()=> dispatch(deletePost(post._id))}>
              <DeleteIcon fontSize='small' /> DELETE
            </Button>
           )}
        </CardActions>
      </Card>
  )
}

export default Post