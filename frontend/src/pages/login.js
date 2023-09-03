import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e)=>{
        e.preventDefault();
        const data = { 'Email':email, 'Password':password };
        await axios.post('http://localhost:5000/login',data)
        .then((res)=>{ 
            const id = res.data;
            localStorage.setItem('userid',id);
            navigate('/'); })
        .catch((err)=>{ setError('Invalid email or password!'); })
    }

    return(
        <div className="container login">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
           <label>Email</label>
           <input type="email" value={email}
           onChange={(e)=>{ setEmail(e.target.value); }} required/>

           <label>Password</label>
           <div className='password-wrp'>
                <input type={ showPassword ? 'text':'password'}
                 value={password}
                onChange={(e)=>{ setPassword(e.target.value); }} required/>
                
                <div className='icon' onClick={ ()=>{ setShowPassword(!showPassword); }}>
                { showPassword ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                </div>
           </div>

           <input type="submit" value="Login"/>
           {error && <p className="error">{error}</p>}

           <p>Don't have an account <Link to="/register">Sign up</Link></p>
        </form>
       </div>
    )
}

export default Login;