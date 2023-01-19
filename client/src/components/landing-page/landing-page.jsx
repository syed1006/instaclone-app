import img from './bg.jpg';
import {useNavigate} from 'react-router-dom';
import './landing-page.css'
import { useState } from 'react';
const LandingPage = ()=>{
    const navigate = useNavigate();
    const [data, setData] = useState({type:'password', error:false});
    const handleClick = ()=>{
        if(data.username === 'salman1006' && data.password === '10061998'){
            console.log('here')
            navigate('/Posts');
        }
        else{
            setData({...data, error:true});
            setTimeout(()=> setData({...data, error:false}), 2000)

        }
    }
    const showPassword = ()=>{
        if(data.type === 'password')setData({...data, type:'text'})
        else setData({...data, type:'password'})
    }
    return(
        <div className="container">
            <div className="img-container">
                <img src={img} alt="form Faris Mohammed" />
            </div>
            <section className="text">
                <h1><span></span>InstaClone</h1>
                {data.error && <p className='red'>Username and password does not match.</p>}
                <div className='input-container'>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id='username' onChange={(e)=>setData({...data, username:e.target.value })}/>
                </div>
                <div className='input-container'>
                    <label htmlFor="password">Password: </label>
                    <input type={data.type} id='password' onChange={(e)=>setData({...data, password:e.target.value })}/>
                    {(data.type === 'password')?<button className="show-password" onClick={showPassword} title="Show Password"></button> : <button className="hide-password" onClick={showPassword} title="Hide Password"></button>} 
                </div>
                <button className='login' onClick={handleClick}>Login</button>
                {/* <button onClick={()=>{navigate('/Posts')}}>navigate</button> */}
            </section>
        </div>
    )
}
export default LandingPage