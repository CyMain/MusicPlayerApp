import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import "./ProfilePage.css";
import demopfp from "/data/demopfp.jpg";
import SongOptions from "../../components/SongOptions/SongOptions";

// Hero section of the user profile.
function UserPFPLarge(){
    return(
        <>
        <figure className="profile-pfp">
            <img src={demopfp} alt="" />
        </figure>
        </>
    )
}

function UserProfileHero(){
    return(
        <>
            <div className="user-profile-hero">
                <UserPFPLarge/>
                <div className="user-details">
                    <h2 className="user-name">
                        Guest
                    </h2>
                    <button className="edit-profile-button">
                        Edit Profile
                    </button>
                </div>
            </div>
        </>
    )
}

// Bottom half of profile page

function RecentSong({ song }){
    const [poppedUp, setPoppedUp] = useState(false)
    
    
    function handlePopUp(e){
        e.stopPropagation()
        if (poppedUp){
            setPoppedUp(false)
            console.log("Popup is now false")
        }else{
            setPoppedUp(true)
            console.log("Popup is now true")
        }
    }


    return(
        <>
        <div className="recent-song">
            <figure className="song-cover">
                <img src={song.cover_link} alt="" />
            </figure>
            <div className="song-name">
                {song.name}
            </div>
            <div className="song-options" onClick={handlePopUp}>
                <EllipsisVertical/>
                <SongOptions poppedUp={poppedUp} setPoppedUp={setPoppedUp} />
            </div>
        </div>
        </>
    )
}

function RecentSongsList(){
    const recentSongs = [
        {
            id:1,
            name:"Song Name 1",
            cover_link:"/data/covers/bad_apple_cover.png",
        },
    ]

    return(
        <>
            <h2>Recents Played</h2>
            <ul>
                {recentSongs.map(
                    (song)=> <RecentSong key={song.id} song={song} />
                )}
            </ul>
        </>
    )
}

export default function ProfilePage(){
    return (
        <>
            <UserProfileHero/>
            <div className="profile-page-bottom">
                <div className="left">
                    <div className="month-details">
                        <h2>This Month</h2>
                        <ul>
                            <li className="month-detail">
                                <h2>182</h2>
                                <span>songs Played</span>
                            </li>
                            <li className="month-detail">
                                <h2>182</h2>
                                <span>songs Played</span>
                            </li>
                            <li className="month-detail">
                                <h2>182</h2>
                                <span>songs Played</span>
                            </li>
                        </ul>
                    </div>
                    <div className="preferences">
                        <h3>Preferences</h3>
                        <div className="autoplay-preference">
                            <span>Autoplay</span>
                        </div>
                        <button className="logout">
                            Logout
                        </button>
                    </div>
                </div>
                <div className="right">
                    <RecentSongsList/>
                </div>
            </div>
        </>
    )
}