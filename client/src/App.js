import PostView from './components/post-view/post-view';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import SignUp from './components/signup/SignUp';
import UserState from './context/UserContext/UserState';
import NewPost from './components/NewPost/NewPost';
import Header from './components/header/header';
import LoginMessage from './components/LoginMessage/LoginMessage';

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
                    <Route path="/*" element={<LoginMessage/>}/>
                </Routes>
            </BrowserRouter>
        </UserState>
    )
}

export default App;
