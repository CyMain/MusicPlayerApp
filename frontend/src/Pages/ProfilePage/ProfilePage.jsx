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

export default function ProfilePage(){
    return (
        <>
            <UserProfileHero/>
        </>
    )
}