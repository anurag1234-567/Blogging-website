import React , { useState, useEffect } from "react";
import {Link, useParams, useNavigate} from 'react-router-dom';
import axios from "axios";

function Get(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [Post, setPost] = useState({});
  const userid = localStorage.getItem('userid');
  
  const deletePost = async()=>{
    try{
      await axios.delete(`http://localhost:5000/posts/${id}`);
      navigate('/');
    }catch(err){
      alert(err);
    } }
  
  useEffect(()=>{
    const fetchdata = async ()=>{
      const res = await axios.get(`http://localhost:5000/posts/${id}`);
      setPost(res.data); }
    fetchdata();
  },[]);

  return(
    <div className="box">
      <h2>{Post.Title}</h2>
      <p className="content">{Post.Content}</p>
      <p className="author">~ {Post.Author}</p>

      { (userid === Post.userId) && 
      <div className="btn-wrp">
      <Link to={`/posts/${Post._id}/edit`}>
      <button className="edit">Edit</button>
      </Link>
      <button className="delete" onClick={deletePost}>Delete</button>
      </div> }
      <p className="link"><Link to="/">Back</Link></p>
    </div>
  )
}
export default Get;