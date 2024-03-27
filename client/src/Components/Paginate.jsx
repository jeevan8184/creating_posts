import { Pagination, PaginationItem } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { getPosts } from '../actions';

const Paginate = ({page}) => {
    const dispatch=useDispatch();
    const {numberOfPages}=useSelector((state)=> state.posts);

    useEffect(()=> {
      dispatch(getPosts(page));
    },[page])

  return (
    <Pagination
        count={numberOfPages}
        page={Number(page)}
        variant='outlined'
        color='primary'
        renderItem={(item)=> (
            <PaginationItem {...item} component={Link} to={`/newPosts?page=${item.page}`} />
        )}
    />
  )
}

export default Paginate;