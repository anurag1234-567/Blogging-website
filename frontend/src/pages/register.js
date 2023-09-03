import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Register(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [error,setError] = useState('');
    const [password,setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async(e)=>{
        e.preventDefault();
        const data = { 'Name':name, 'Email':email, 'Password':password };
        await axios.post('http://localhost:5000/register',data)
        .then(()=>{ navigate('/login'); })
        .catch((err)=>{ setError(err.response.data); })
    }

    return(
        <div className="container register">
         <h2>Create Account</h2>
         <form onSubmit={handleRegister}>
            <label>Name</label>
            <input type="text" value={name}
            onChange={(e)=>{ setName(e.target.value); }} required/>

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

            <input type="submit" value="Register"/>
            {error && <p className="error">{error}</p>}
         </form>
         <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}
export default Register;