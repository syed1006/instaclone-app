import { useState, useEffect } from "react";
import Header from "../header/header"
import Post from "../post/post";
import './post-view.css';
const PostView = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3004/user')
            .then((res) => { return res.json() })
            .then((data) => {
                setUsers(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <>
            <Header />
            <main>
                {users.map((user, index) => {
                    return <Post key={index} user={user} />
                })}
            </main>
        </>
    )
}
export default PostView