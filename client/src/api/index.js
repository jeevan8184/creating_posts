
import axios from 'axios';

const API=axios.create({baseURL:'http://localhost:8000'})

API.interceptors.request.use((req)=> {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const fetchPostsBySearch=(searchQuery)=>API.get(`/newPosts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const fetchPosts=(page)=>API.get(`/newPosts?page=${page}`);
export const fetchPost=(id)=>API.get(`/newPosts/${id}`);

export const commentPost=(value,id)=>API.post(`/newPosts/${id}/commentPost`,{value});

export const createPost=(post)=>API.post('/newPosts',post);
export const updatePost=(id,post)=>API.patch(`/newPosts/${id}`,post);
export const deletePost=(id)=>API.delete(`/newPosts/${id}`);
export const likePost=(id)=>API.patch(`/newPosts/${id}/likePost`);

export const signin=(data)=>API.post('/newUsers/signin',data);
export const signup=(data)=>API.post('/newUsers/signup',data);
