import './header.css'
const Header = ()=>{
    return(
        <header className='main-header'>
            <div className='logo-title'>
            <div className="logo">
            </div>
            <h1>InstaClone</h1>
            </div>
            <div className="cam">
                <button className="launch-cam"></button>
            </div>
        </header>
    )
}
export default Header