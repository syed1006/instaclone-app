import img from './bg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'
import { useState } from 'react';
import { useContext } from 'react';
import UserContext from '../../context/UserContext/UserContext';
const Login = () => {
    const url = process.env.REACT_APP_HOST;
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const {updateLogged} = context;
    const [data, setData] = useState({ type: 'password', error: false });
    const handleClick = async () => {
        
        try{
            const response = await fetch(url+'/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            })
            
            const res = await response.json()
            console.log(res);
            if (res.status === 'Failure') {
                if (Array.isArray(res.message)) setData({ ...data, error: true, message: res.message[0].msg })
                else {
                    setData({ ...data, error: true, message:res.message })
                }
            } else {
                localStorage.setItem('token', res.token)
                updateLogged(true);
                navigate('/posts')

            }
        }
        catch (e) {
            setData({ ...data, error: true, message: e.message })
        }
        
    }
    const showPassword = () => {
        if (data.type === 'password') setData({ ...data, type: 'text' })
        else setData({ ...data, type: 'password' })
    }
    return (
        <div className="container">
            <div className="img-container">
                <img src={img} alt="form Faris Mohammed" />
            </div>
            <section className="text">
                <h1><span></span>InstaClone</h1>
                {data.error && <p className='red'>{data.message}</p>}
                <div className='form-container'>
                    <div className='input-container'>
                        <label htmlFor="email">Email: </label>
                        <input type="text" id='email' name='email' placeholder='Enter your email' onChange={(e) => setData({ ...data, email: e.target.value })} />
                    </div>
                    <div className='input-container'>
                        <label htmlFor="password">Password: </label>
                        <input type={data.type} id='password' name='password' placeholder='Enter your password' onChange={(e) => setData({ ...data, password: e.target.value })} />
                        {(data.type === 'password') ? <button className="show-password" onClick={showPassword} title="Show Password"></button> : <button className="hide-password" onClick={showPassword} title="Hide Password"></button>}
                    </div>
                </div>
                <button className='login' onClick={handleClick}>Login</button>
                <p>Don't have an account <Link to={'/signup'} >sign up.</Link></p>
            </section>
        </div>
    )
}
export default Login