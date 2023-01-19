import { useNavigate } from 'react-router-dom'
import './header.css'
const Header = ()=>{
    const navigate = useNavigate()
    return(
        <header className='main-header'>
            <div className='logo-title'>
            <div className="logo">
            </div>
            <h1>InstaClone</h1>
            </div>
            <div className="cam">
                <button className="launch-cam" onClick={()=>{navigate('/newpost')}}></button>
            </div>
        </header>
    )
}
export default Header