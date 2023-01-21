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
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/signup" element={<SignUp />} />
                    <Route exact path="/posts" element={<PostView />} />
                    <Route exact path="/newpost" element={<NewPost/>}/>
                    <Route exact path="/*" element={<LoginMessage/>}/>
                </Routes>
            </BrowserRouter>
        </UserState>
    )
}

export default App;
