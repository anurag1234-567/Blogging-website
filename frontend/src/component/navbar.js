import React from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';

function Navbar(){

   const userid = localStorage.getItem('userid');
   const navigate = useNavigate();

   const handleLogout = ()=>{
      localStorage.removeItem('userid');
      navigate('/login');
   }

   return(
    <div className='navbar'>
      <span className="brand">Blogs web</span>
      <div className="links">
      <Link to='/' className="link">Home</Link>
      <Link to={`/myblogs`} className="link">MyBlogs</Link>
      <Link to='/posts/new' className="link">Create Blog</Link>
      </div>
      <button className="logout" onClick={handleLogout}>Logout</button>
     <Outlet/>
    </div>
   )
}

export default Navbar;