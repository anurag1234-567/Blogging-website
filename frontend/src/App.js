import React from "react";
import { Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar.js';
import Home from './pages/home.js';
import Post from './pages/post.js';
import Get from './pages/get.js';
import Edit from './pages/edit.js';
import Register from './pages/register.js';
import Login from './pages/login.js';
import MyBlogs from './pages/myblogs.js';
import PrivateRoutes from './pages/privateroutes.js';
import './app.css';

function App(){
    return(
        <>
          <Navbar />
          <Routes>
            <Route element = {<PrivateRoutes />} >
              <Route path='/' element={<Home />} />
              <Route path='/posts/:id' element={<Get />} />
              <Route path='/posts/new' element={<Post />} />
              <Route path='/posts/:id/edit' element={<Edit />} />
              <Route path='/myblogs' element={<MyBlogs />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </>
    )
}
export default App;