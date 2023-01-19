import img from '../login/bg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import '../login/login.css'
import { useState } from 'react';
import { useEffect } from 'react';

function SignUp() {
    let timer;
    const url = process.env.REACT_APP_HOST;
    const navigate = useNavigate();
    const [data, setData] = useState({ type: 'password', error: false });
    const createUser = async () => {
        console.log(url)
        try {
            const response = await fetch(url + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password
                })
            })
            const res = await response.json();
            console.log(res);
            if (res.status === 'Failure') {
                if (Array.isArray(res.message)) setData({ ...data, error: true, message: res.message[0].msg })
                else {
                    setData({ ...data, error: true, message:` ${res.message} login instead.` })
                }
            } else {
                setData({ ...data, user: true })
                timer = setTimeout(() => {
                    navigate('/')
                }, 3000)

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
    useEffect(() => {
        return () => {
            clearTimeout(timer);
        }
    }, [])
    if (data.user) {
        return (
            <div className="container">
                <div className="img-container">
                    <img src={img} alt="form Faris Mohammed" />
                </div>
                <h3 style={{color:'green', textAlign:'center', width:'100%'}}>Created the account , redirecting to login...</h3>
            </div>
        )
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
                        <label htmlFor="name">Name: </label>
                        <input type="text" id='name' name='name' placeholder='Enter your name' onChange={(e) => setData({ ...data, name: e.target.value })} />
                    </div>
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
                <button className='login' onClick={createUser}>Sign up</button>
                <p>Already have an account <Link to={'/'} >login.</Link></p>
            </section>
        </div>
    )
}

export default SignUp
