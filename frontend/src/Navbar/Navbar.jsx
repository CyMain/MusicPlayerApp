import "./Navbar.css";


export default function Navbar(){
    return(
        <>
            <nav className="nav-bar">
                <ul className="nav-list">
                    <li className="nav-item">
                        To Home
                    </li>
                    <li className="nav-item">
                        To Playlist
                    </li>
                    <li className="nav-item">
                        To Profile
                    </li>
                </ul>
            </nav>
        </>
    )
}