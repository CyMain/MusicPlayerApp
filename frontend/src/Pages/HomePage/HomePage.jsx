import "./HomePage.css"
import { useSongs } from "../../Contexts/SongsContextFile"
import defaultCover from "/defaultCover.jpg"
import { useEffect, useState } from "react"



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

    function SectionTitle({ children }){
        return(
            <>
                <h1 className="section-title">
                    <span>{children}</span>
                    <span>&gt;</span>
                </h1>
            </>
        )
    }
    


// Songs List Components
    function SongsListItem({ song_data }){
        return(
            <>
                <li className="song-item list-item">
                    <ListItemCover coverURL={song_data.cover ?? defaultCover}/>
                    <span className="playlist-name">
                        {song_data.song_name}
                    </span>
                    <span>
                        {song_data.play_count} plays
                    </span>
                </li>
            </>
        )
    }

    function SongsList(){
        let init_songs_list = [
            {
                id:"12d3daxcz",
                song_name:"Sonic",
                cover:null,
                play_count: 45
            },
        ]

        const [songs_list, setSongs_list] = useState(init_songs_list)

        useEffect(()=>{
            async function fetchData(){
                try{
                    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/home/songs`)
    
                    if (!response.ok){
                        const err_response =  await response.json().catch(()=> null);
                        console.log("Response not okay: ", err_response)
                        throw new Error("Failed to fetch songs from home api")
                    }
    
                    console.log("Connected succesfully to home api")
    
                    const data = await response.json()
    
                    setSongs_list(data.songs_list)

                    console.log("Songs list: ", songs_list)
    
                }catch(error){
                    console.error("Failed to fetch songs or failed to connect to api: ", error)
                }
            }
            fetchData()
        }, [])

        return(
            <>
                <ul className="songs-list list">
                    {songs_list.map(
                        (song_data)=> <SongsListItem key={song_data.id} song_data={song_data}/>
                    )}
                </ul>
            </>
        )
    }

    function Songs(){
        return(
            <>
                <section>
                    <SectionTitle>Songs</SectionTitle>
                    <SongsList/>
                </section>
            </>
        )
    }


// Playlists List Components
    function PlaylistItem({ playlist_data }){
        console.log("Playlist Data: ", playlist_data)
        return(
            <>
                <li className="playlist-item list-item">
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
                <ul className="playlists-list list">
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
                    <SectionTitle>Playlists</SectionTitle>
                    <PlaylistsList/>
                </section>
            </>
        )
    }


//Hero Components
    function HeroSongCover({coverURL}){
        const { defaultCover } = useSongs()
        console.log("Cover_url: ", coverURL)
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
        console.log("currSong: ", currSong)
        return(
            <>
                <HeroSongCover coverURL={currSong.cover}/>
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
            <Songs/>
        </>
    )
}
