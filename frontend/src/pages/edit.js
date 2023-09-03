import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';

function Edit(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [post,setPost] = useState({});

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await axios.put(`http://localhost:5000/posts/${id}`,post);
            navigate(`/posts/${id}`);
        }catch(err){
           alert(err);
        }
    }

    const fetchdata = async()=>{
        try{
            const res = await axios.get(`http://localhost:5000/posts/${id}`);
            setPost({ _id:res.data._id, Title:res.data.Title, 
                Author:res.data.Author, Content:res.data.Content });
        }catch(err){
            alert(err);
        }
    }

    useEffect(()=>{
        fetchdata();
    },[])

  return(
    <div className="container">
    <h2>Edit your Post</h2>
    <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={post.Title}
        onChange={(e)=>{ setPost({...post, Title: e.target.value }); }} />

        <label>Author</label>
        <input type="text" value={post.Author} 
        onChange={(e)=>{ setPost({...post, Author: e.target.value }); }} />

        <label>Content</label>
        <textarea row="15" col={10} value={post.Content} 
        onChange={(e)=>{ setPost({...post, Content: e.target.value }); }} />
        <input type='submit' value="Save"/>
    </form>
    <Link to={`/posts/${id}`} className='back'>Back</Link>
    </div>
  )
}
export default Edit;
