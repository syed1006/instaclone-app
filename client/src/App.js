import PostView from './components/post-view/post-view';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import SignUp from './components/signup/SignUp';
import UserState from './context/UserContext/UserState';
import NewPost from './components/NewPost/NewPost';
import Header from './components/header/header';

function App() {

    return (
        <UserState>
            <BrowserRouter>
            <Header/>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/posts" element={<PostView />} />
                    <Route path="/newpost" element={<NewPost/>}/>
                    {/* <Route path="google.com" component={()=>{window.location.href = 'https://www.wikipedia.com';return null}}/> */}
                </Routes>
            </BrowserRouter>
        </UserState>
    )
}

export default App;
