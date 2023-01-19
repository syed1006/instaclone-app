import { useContext } from "react";
import { useState, useEffect } from "react";
import UserContext from "../../context/UserContext/UserContext";
import LoginMessage from "../LoginMessage/LoginMessage";
import Post from "../post/post";
import './post-view.css';
const PostView = () => {
    const [posts, setPosts] = useState([]);
    const context = useContext(UserContext)
    const {state:{isLogged}, updateLogged} = context;
    const url = process.env.REACT_APP_HOST;
    const token = localStorage.getItem('token');
    
    
    const fetchPosts = async ()=>{
        try{
            const response = await fetch(url + '/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            })
            const res = await response.json();
            console.log(res);
            setPosts(res.result)
            updateLogged(true)
        }
        catch(e){
            console.log(e);
            updateLogged(false)
        }
    }
    
    useEffect(() => {
        fetchPosts()
    }, [])

    if(!isLogged || !token || token === undefined){
        console.log(token, isLogged)
        return(
            <LoginMessage/>
        )
    }
    return (
        <>
            <main>
                {posts.map((post, index) => {
                    return <Post key={index} post={post} />
                })}
            </main>
        </>
    )
}
export default PostView