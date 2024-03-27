import React, { useState,useRef } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import {useDispatch} from 'react-redux';
import { getComments } from '../../actions';

const CommentSec = ({post}) => {
  const [initVal, setInitVal] = useState('')
  const [comments, setComments] = useState(post?.comments);
  
  const user=JSON.parse(localStorage.getItem('profile'));
  const dispatch=useDispatch();
  const commentRef=useRef();

  const handleComment=async()=> {
    const newComment=`${user?.result?.name}: ${initVal}`;
    const getcomments=await dispatch(getComments(newComment,post._id));
    setComments(getcomments);
    setInitVal('');

    commentRef.current.scrollIntoView({behaviour:'smooth'});

  }

  return (
      <div className=''>
        <Typography variant='h5'>Comment on Post</Typography>
        <div className=' flex-wrap'>
          {user?.result && (
            <div className='flex flex-col gap-2 max-w-sm overflow-hidden'>
               <TextField value={initVal} onChange={(e)=>setInitVal(e.target.value)} 
                  multiline  fullWidth className='max-w-sm'
                />
                <Button variant='contained' fullWidth onClick={handleComment} disabled={!initVal}>comment</Button>
            </div>
          )}
          <div className=' h-64 overflow-y-auto lex-wrap p-4 m-4'>
            { Array.isArray(comments) && comments?.map((c,i)=> (
              <Typography key={i} variant='subtitle1' gutterBottom>
                <strong>{c.split(':')[0]} : </strong>
                {c.split(':')[1]}
              </Typography>
            ))}
            <div ref={commentRef} />
          </div>
        </div>
      </div>
  )
}

export default CommentSec