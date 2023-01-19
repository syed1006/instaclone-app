import React from 'react'
import { useState } from 'react';
import './NewPost.css'

const NewPost = ()=>{
    const [formData, updateData] = useState({})
    const url = process.env.REACT_APP_HOST;
    const token = localStorage.getItem('token');
    async function createPost(e){
        e.preventDefault();
        const data = new FormData();
        for(let key of Object.keys(formData)){
            data.append(
                key, formData[key]
            )
        }
        for(let entry of data.entries())console.log(entry[0], ' ', entry[1])
        
        try{
            const response = await fetch(url + '/posts', {
                method: 'POST',
                headers: {
                    'authorization': token
                },
                mode:'cors',
                body: data
            })
            const res = await response.json();
            console.log(res);
        }
        catch(e){
            console.log(e.message)
        }

    }
    return(
        <form action="" className='newpost'>
            <div className="input-container">
                <input className='form-input' type="file" placeholder='No File chosen' id='image' name='image' onChange={(e)=>{updateData({...formData, image:e.target.files[0]})}}/>
                {formData.image && <img src={URL.createObjectURL(formData.image)} alt="" />}
            </div>
            <div className="input-container">
                <input className='form-input' placeholder='Title' type="text" id='title' name='title' onChange={(e)=>{updateData({...formData, title:e.target.value})}}/>
            </div>
            <div className="input-container">
                <input className='form-input' placeholder='Description' type="text" id='description' name='description' onChange={(e)=>{updateData({...formData, description:e.target.value})}}/>
            </div>
            <div className="input-container">
                <input className='form-input' placeholder='Location'  type="text" id='location' name='location' onChange={(e)=>{updateData({...formData, location:e.target.value})}}/>
            </div>
            
            <button onClick={(e)=>{createPost(e)}}>Post</button>
        </form>
    )
}
export default NewPost