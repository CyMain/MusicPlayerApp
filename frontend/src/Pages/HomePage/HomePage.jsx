import "./HomePage.css"
import { useSongs } from "../../Contexts/SongsContextFile"
import defaultCover from "/defaultCover.jpg"



// Resuable Components
    function ListItemCover({coverURL}){
        return(
            <>
                <figure className="item-cover">
                    <img src={coverURL} alt="" />
                </figure>
            </>
        )
    }


// Playlists List Components
    function PlaylistItem({ playlist_data }){
        console.log("Playlist Data: ", playlist_data)
        return(
            <>
                <li className="playlist-item">
                    <ListItemCover coverURL={playlist_data.playlist_cover_url ?? defaultCover}/>
                    <span className="playlist-name">
                        {playlist_data.playlist_name}
                    </span>
                    <span>
                        {playlist_data.songs.length} songs
                    </span>
                </li>
            </>
        )
    }

    function PlaylistsList(){

        // Sample data for playlists
        const playlists = [
            {
                id:"60fean313f",
                playlist_name:"Lolz",
                playlist_cover_url:null,
                songs:[
                    //This will refer only to the ids of the songs
                ],
            },
            {
                id:"60c2ean313d",
                playlist_name:"GGs",
                playlist_cover_url:null,
                songs:[
                    //This will refer only to the ids of the songs
                ],
            }
        ]
        return(
            <>
                <ul className="playlists-list">
                    {
                        playlists.map(
                            (playlist)=>{
                                return (
                                    <PlaylistItem key={playlist.id} playlist_data={playlist}/>
                                )
                            }
                        )
                    }
                </ul>
            </>
        )
    }

    function Playlists(){
        return(
            <>
                <section className="home-section home-playlists-section">
                    <h1 className="section-title">
                        <span>Your Playlists</span>
                        <span>&gt;</span>
                    </h1>
                    <PlaylistsList/>
                </section>
            </>
        )
    }


//Hero Components
    function HeroSongCover({coverURL}){
        const { defaultCover } = useSongs()
        return(
            <>
                <figure className="hero-song-cover">
                    <img src={coverURL ?? defaultCover} alt="" />
                </figure>
            </>
        )
    }

    function MostPlayedSong(){
        // Displayed in hero component if there is no Current Song playing
        const mostPlayedSong = "Sonic Colors"
        return(
            <>
                <div className="text">
                    <span>Your most played song is...</span>
                    <h2>{mostPlayedSong}</h2>
                </div>
            </>
        )

    }

    function CurrPlayingHero(){
        // Displayed in hero component if there is a Current Song playing
        const { currSong } = useSongs()
        return(
            <>
                <HeroSongCover coverURL={currSong.coverURL}/>
                <div className="text">
                    <span>Currently playing...</span>
                    <h2>{currSong.song_name}</h2>
                </div>
            </>
        )
    }

    function Hero(){
        let content = null
        const { currSong } = useSongs()
        if(currSong){
            content = <><CurrPlayingHero/></>
        }else{
            content = <><MostPlayedSong/></>
        }
        // Displays either a current song or the user's favourite track.
        return(
            <>
                <section className="home-hero">
                    {content}
                </section>
            </>
        )
    }


export default function HomePage(){
    return(
        <>
            <Hero/>
            <Playlists/>
        </>
    )
}
