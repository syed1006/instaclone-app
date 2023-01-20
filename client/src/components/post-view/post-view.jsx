import { useContext } from "react";
import { useState, useEffect } from "react";
import UserContext from "../../context/UserContext/UserContext";
import LoginMessage from "../LoginMessage/LoginMessage";
import Post from "../post/post";
import InfiniteScroll from 'react-infinite-scroll-component';
import './post-view.css';
const PostView = () => {
    const [state, setState] = useState({totalResults: 0, posts: [], page:1});
    const context = useContext(UserContext)
    const { state: { isLogged }, updateLogged } = context;
    const url = process.env.REACT_APP_HOST;
    const token = localStorage.getItem('token');


    const fetchPosts = async () => {
        try {
            const response = await fetch(url + `/posts?page=${state.page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            })
            const res = await response.json();
            setState({posts: state.posts.concat(res.result), page:state.page+1, totalResults: res.totalResults})
            updateLogged(true)
        }
        catch (e) {
            console.log(e);
            updateLogged(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    if (!isLogged || !token || token === undefined) {
        return (
            <LoginMessage />
        )
    }
    if(state.posts.length === 0){
        return(
            <h1 style={{color:'green', textAlign:'center'}}>No posts to show, create one.</h1>
        )
    }
    return (
        <>
            <main>
                <InfiniteScroll
                    dataLength={state.posts.length} //This is important field to render the next data
                    next={fetchPosts}
                    hasMore={state.posts.length < state.totalResults}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {state.posts.map((post, index) => {
                        return <Post key={index} post={post} />
                    })}
                </InfiniteScroll>

            </main>
        </>
    )
}
export default PostView