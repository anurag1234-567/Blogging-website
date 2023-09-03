import React , { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

function Home(){
 
    const [Posts,setPosts] = useState([]);
    const userid = localStorage.getItem('userid');

    const getdata = async ()=>{
        const res = await axios.get('http://localhost:5000/posts');
        setPosts(res.data);
    }

    useEffect(()=>{
      getdata();
    },[])

    return(
     <div className="card">
     {
      Posts.map((post)=>{
        return(
          <div className="card-itm">
            <Link className="title" to={`/posts/${post._id}`}>{post.Title}</Link>
            <p className="author">{post.Author} 
            <span> {moment(post.CreatedAt).format('DD MMMM YYYY')}</span></p>
          </div>
        )
      })
     }
     </div>
    )
}
export default Home;
