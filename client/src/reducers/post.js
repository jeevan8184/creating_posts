

import {COMMENT, DELETE, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, LIKE, POST, START_LOADING, UPDATE} from '../constants/index'

export default (state={posts:[],isLoading:true},action)=> {
    switch (action.type) {
        case START_LOADING:
            return {...state,isLoading:true};
        case END_LOADING:
            return {...state,isLoading:false};
        case POST:
            return {...state,posts:[...state.posts,action.payload]};
        case FETCH_POST:
            return {...state,post:action.payload};
        case COMMENT:
            return {
                ...state,
                posts:state.posts.map((post)=> {
                    if(post._id===action.payload._id) return action.payload;
                    return post;
                })
            }
        case FETCH_ALL:
            return {
                ...state,posts:action.payload.data,
                numberOfPages:action.payload.numberOfPages,
                currentPage:action.payload.currentPage
            }
        case FETCH_BY_SEARCH:
            return {...state,posts:action.payload};
        case UPDATE:
            return {...state,posts:state.posts.map((post)=>post._id===action.payload._id ? action.payload :post)}
        case DELETE:
            return {...state,posts:state.posts.filter((post)=> post._id !== action.payload)}
        case LIKE:
            return {...state,posts:state.posts.map((post)=>(post._id===action.payload._id ? action.payload:post ))};
        default:
            return state;
    }
}
