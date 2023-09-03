import React, {useState} from "react";
import { Link  } from 'react-router-dom';
import axios from "axios";

function Post(){
    const [Title,setTitle] = useState('');
    const [Author,setAuthor] = useState('');
    const [Content,setContent] = useState('');
    const userid = localStorage.getItem('userid');

    function handleSubmit(e){
     e.preventDefault();
     postdata(); setTitle(''); setAuthor(''); setContent('');
    }

    const postdata = async ()=>{
        const data = { "Title": Title, "Author": Author, "Content": Content, 
         "userId": userid };
        await axios.post('http://localhost:5000/posts',data);
    }

    return(
        <div className="container">
        <h2>Create your Post</h2>
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input type="text" value={Title}
            onChange={ (e)=>{setTitle(e.target.value); }} />
          
            <label>Author</label>
            <input type="Author" value={Author}
            onChange={ (e)=>{setAuthor(e.target.value); }} />

            <label>Content</label>
            <textarea value={Content}
            onChange={ (e)=>{setContent(e.target.value); }} />
            <input type="submit" value="Publish"/>
        </form>
        <Link to="/" className='back'>Back</Link>
        </div>
    )
}
export default Post;