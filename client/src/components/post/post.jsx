
import { useState } from 'react'
import './post.css'

const Post = (props)=>{
    let {user} = props
    const [heart , setHeart] = useState({display: true, count:user.likes});
    function handleClick(){
        if(heart.display){
            setHeart({display:false, count:user.likes+1});
        }else{
            setHeart({display: true, count:user.likes})
        }
    }
    return(
        user && <div className="post-container">
            <div className="post-header">
                <div className="profile-picture">
                    <img src={user.profileImage} alt={` of ${user.name}`} />
                    <div>
                        <h4>{user.name}</h4>
                        <p>{user.location}</p>
                    </div>
                </div>
                <div><button className='post-btn'>...</button></div>
            </div>
            <div className="post-image">
                <img src={user.PostImage} alt={` of ${user.name}`} />
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
                <p>{user.date}</p>
            </div>
            <h2 className="description">{user.description}</h2>
        </div>
    )
}
export default Post;