
import { useState } from 'react'
import './post.css'

const Post = ({post})=>{
    const url = process.env.REACT_APP_HOST;
    const [heart , setHeart] = useState({display: true, count:post.likes, limit:101});
    function handleClick(){
        if(heart.display){
            setHeart({display:false, count:post.likes+1});
        }else{
            setHeart({display: true, count:post.likes})
        }
    }
    function changeLimit(){
        if(heart.limit === 101){
            setHeart({...heart, limit:-1})
        }else{
            setHeart({...heart, limit:101})
        }
    }
    return(
        post && <div className="post-container">
            <div className="post-header">
                <div className="user-details">
                    <h4>{post.user?.name}</h4>
                    <p>{post.location}</p>
                </div>
                <div><button className='post-btn'>...</button></div>
            </div>
            <div className="post-image">
                <img src={url + '/uploads/' + post.PostImage} alt={` of ${post.user?.name}`} />
            </div>
            <div className="post-likes">
                <div className="likes">
                    <div className="icons">
                        <div className="heart-btn" onClick={handleClick}>
                            {(heart.display)?<div className="plain-heart"></div>
                            : <div className="color-heart"></div>}
                        </div>
                        <div className="send-btn"></div>
                    </div>
                    <p>{heart.count} likes</p>
                </div>
                <p>{post.createdAt.split('T')[0]}</p>
            </div>
            <div className="description">
                <h2 >{post.title}</h2>
                <p onClick={changeLimit} style={{cursor:'pointer'}}>{post.description.length > 100 ? post.description.slice(0, heart.limit) + '...' : post.description}</p>
            </div>
        </div>
    )
}
export default Post;