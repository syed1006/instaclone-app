
import { useState } from 'react'
import './post.css'

const Post = ({post})=>{
    const url = process.env.REACT_APP_HOST;
    const [heart , setHeart] = useState({display: true, count:post.likes});
    function handleClick(){
        if(heart.display){
            setHeart({display:false, count:post.likes+1});
        }else{
            setHeart({display: true, count:post.likes})
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
            <h2 className="description">{post.description}</h2>
        </div>
    )
}
export default Post;