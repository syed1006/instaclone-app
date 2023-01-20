import React, { useRef } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext/UserContext';
import LoginMessage from '../LoginMessage/LoginMessage';
import './NewPost.css'

const NewPost = () => {
    const [formData, updateData] = useState({})
    const url = process.env.REACT_APP_HOST;
    const fileInput = useRef()
    const navigate = useNavigate()
    const context = useContext(UserContext)
    const {state:{isLogged}} = context;
    const token = localStorage.getItem('token');
    async function createPost(e) {
        e.preventDefault();
        const data = new FormData();
        for (let key of Object.keys(formData)) {
            data.append(
                key, formData[key]
            )
        }
        

        try {
            const response = await fetch(url + '/posts', {
                method: 'POST',
                headers: {
                    'authorization': token
                },
                mode: 'cors',
                body: data
            })
            const res = await response.json();
            console.log(res);
            if(res.status === 'Success')navigate('/posts')
            else{
                updateData({...formData, error: true});
            }
        }
        catch (e) {
            updateData({...formData, error: true})
            console.log(e.message)
        }
    }
    const handleClick = ()=>{
        fileInput.current.click()
    }

    const goBack = (e)=>{
        e.preventDefault();
        navigate('/posts')
    }
    if(!isLogged || !token || token === undefined){
        console.log(token, isLogged)
        return(
            <LoginMessage/>
        )
    }
    return (
        <>
            <form action="" id='newpost'>
                <input className='form-input' type="text" readOnly value={formData.image?formData.image.name:'No file Chosen'}  name='message' />
                <input className='form-input' type="text" value={'Browse'} readOnly name='browse' onClick={handleClick}/>
                <input ref={fileInput} className='form-input' type="file"  id='image' name='image' onChange={(e) => { updateData({ ...formData, image: e.target.files[0] }) }} />
                <input className='form-input' placeholder='Title' type="text" id='title' name='title' onChange={(e) => { updateData({ ...formData, title: e.target.value }) }} />
                <input className='form-input' placeholder='Location' type="text" id='location' name='location' onChange={(e) => { updateData({ ...formData, location: e.target.value }) }} />
                <input className='form-input' placeholder='Description' type="text" id='description' name='description' onChange={(e) => { updateData({ ...formData, description: e.target.value }) }} />
                <button onClick={(e) => { createPost(e) }} id='post-btn'>Post</button>
                <button onClick={(e) => { goBack(e) }} id='discard-btn'>Discard</button>
            </form>
            {formData.image && <div className="preview"><img src={URL.createObjectURL(formData.image)} alt="" /><h5>Preview</h5></div>}
            {formData.error && <h3 style={{color:'red', textAlign:'center'}}>Enable to create post, enter valid data in all fields!!</h3>}
        </>
    )
}
export default NewPost