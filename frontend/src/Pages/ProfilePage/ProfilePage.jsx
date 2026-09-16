import { EllipsisVertical } from "lucide-react";
import "./ProfilePage.css";
import demopfp from "/data/demopfp.jpg";

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
    return(
        <>
        <div className="recent-song">
            <figure className="song-cover">
                <img src={song.cover_link} alt="" />
            </figure>
            <div className="song-name">
                {song.name}
            </div>
            <div className="song-options">
                <EllipsisVertical/>
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
            <h3>Recents Played</h3>
            <ul>
                {recentSongs.map(
                    (song)=> <RecentSong song={song} />
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

                    </div>
                    <div className="preferences">

                    </div>
                </div>
                <div className="right">
                    <RecentSongsList/>
                </div>
            </div>
        </>
    )
}