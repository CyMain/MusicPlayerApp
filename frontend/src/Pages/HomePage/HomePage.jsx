import "./HomePage.css"
import { useSongs } from "../../Contexts/SongsContextFile"


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
    return(
        <>

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
        </>
    )
}
