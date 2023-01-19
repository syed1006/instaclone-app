import PostView from './components/post-view/post-view';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landing-page/landing-page';

function App() {
  
    return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<LandingPage/>}/>
              <Route path="Posts" element={<PostView/>}/>
              {/* <Route path="google.com" component={()=>{window.location.href = 'https://www.wikipedia.com';return null}}/> */}
          </Routes>
      </BrowserRouter>
    )
}

export default App;
