import { useRef, useState, useEffect } from "react";
import song_list from "../data/song_list.json";
import bad_ApplE from "/data/audios/bad_apple_audio.mp3";
import './QueueView.css';


const CurrSongCover = ({song_cover})=>{
    return(
        <>
            <figure className="song-cover">
                <img src={song_cover} alt="" />
            </figure>
        </>
    )
}

const SongControls = ({song_data, songHandler})=>{
    const audio_tag = useRef(null)
    const progress_ref = useRef(null)
    const fakeFillRef = useRef(null)
    const [is_playing, setIsPlaying] = useState(false)

    function pauseSong(){
        audio_tag.current.pause()
        setIsPlaying(false)
    }
    function playSong(){
        audio_tag.current.play()
        setIsPlaying(true)
    }

    function handleAudio(instruction){
        if(instruction == "play"){
            if (is_playing == false){
                playSong()
            } else{
                pauseSong()
            }
        }else if(instruction == "previous"){
            pauseSong()
            songHandler.previousSongFunc()
        }else if(instruction == "next"){
            pauseSong()
            songHandler.nextSongFunc()
        }
        console.log("song control used.")
    }

    function handleHoverFill(e){
        if(fakeFillRef.current){
            const rect = e.currentTarget.getBoundingClientRect();
            const hoverPosition = (e.clientX - rect.left) / rect.width;
            const percent = Math.max(0, Math.min(1, hoverPosition)) * 100;
            fakeFillRef.current.style.width = `${percent}%`
            fakeFillRef.current.style.height = `100%`;
            
        }
    }

    function handleHoverUnfill(){
        if(fakeFillRef.current){
            fakeFillRef.current.style.width = `0%`;
            fakeFillRef.current.style.height = `0%`;
        }
    }

    function handleTimeUpdate(){
        if(audio_tag.current && progress_ref.current){
            const current = audio_tag.current.currentTime;
            const duration = audio_tag.current.duration;
            const percent = (current/duration )* 100;
            progress_ref.current.style.width = `${percent}%`
        }
    }

    function handleSeek(e){
        const rect = e.currentTarget.getBoundingClientRect();
        console.log(`rect: ${rect}`)
        const clickPosition = (e.clientX - rect.left) / rect.width;
        audio_tag.current.currentTime = clickPosition * audio_tag.current.duration;
    };

    return(
        <>
            <div className="song-controls">
                <h2 className="song-name">
                    {song_data.song_name}
                </h2>
                <div className="audio-controls">
                    <div className="audio-control-buttons">
                        <button 
                            className="btn previous-track"
                            onClick={()=>handleAudio("previous")}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title xmlns="">skip-previous-filled</title><path fill="currentColor" d="M17.46 6.11a1 1 0 0 0-1.04.08l-7 5c-.26.19-.42.49-.42.81s.16.63.42.81l7 5c.17.12.38.19.58.19c.16 0 .31-.04.46-.11c.33-.17.54-.51.54-.89V7c0-.37-.21-.72-.54-.89M6 6h2v12H6z"/></svg>
                        </button>
                        <button 
                            className="btn play-button"
                            onClick={()=>handleAudio("play")}
                        >
                            {
                                is_playing ? 
                                (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title xmlns="">pause</title><path fill="currentColor" d="M14 19h4V5h-4M6 19h4V5H6z"/></svg>
                                ):(
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title xmlns="">play-fill</title><path fill="currentColor" d="M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832"/></svg>
                                )
                            }
                        </button>
                        <button 
                            className="btn next-track"
                            onClick={()=>handleAudio("next")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title xmlns="">skip-next</title><path fill="currentColor" d="M16.5 18V6h2v12zm-11 0V6l9 6z"/></svg>
                        </button>
                    </div>
                    <div 
                        className="progress-bar-container"
                        onClick={handleSeek}
                        onMouseMove={handleHoverFill}
                        onMouseLeave={handleHoverUnfill}
                    >
                        <div
                            className="progress-bar-hover-fill"
                            ref={fakeFillRef}
                        >

                        </div>
                        <div
                            className="progress-bar-fill"
                            ref={progress_ref}
                        >
                        </div>
                    </div>
                </div>
                <audio
                    src={song_data.audio}
                    ref={audio_tag}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={()=>setIsPlaying(false)}
                ></audio>
            </div>
        </>
    )
}

const CurrPlayingSong = ({song, songHandler}) =>{
    const song_data = {
        cover:song.cover,
        song_name:song.song_name,
        audio:song.audio
    }
    
    return(
        <>
            <div className="song-controller">
                <CurrSongCover song_cover={song_data.cover}/>
                <SongControls song_data={song_data} songHandler={songHandler}/>
            </div>
        </>
    )
}

// Queue Components
const QueueItem = ({item, handleSongChange}) =>{
    return(
        <>
            <li 
                className="queue-item"
                onClick={()=>handleSongChange(item.id)}
            >
                <figure className="song-cover-queue">
                    <img src={item.cover} alt="" />
                </figure>
                <h4 className="song-name-queue">
                    {item.song_name}
                </h4>
            </li>
        </>
    )
}

const CurrQueue = ({songs_list, handleSongChange})=>{
    return(
        <>
            <ul className="queue">
                {
                    songs_list.map(
                        item => <QueueItem item={item} key={item.id} handleSongChange={handleSongChange}/>
                    )
                }
            </ul>
        </>
    )
}

const SongAdder = () => {
    return(
        <>
            <div className="song_adder_container">
                <input type="file" name="added_song" id="added_song" />
            </div>
        </>
    )
}

const QueueView = ()=>{
    const songs_list = song_list 
    const [song_list_index, set_song_list_index] = useState(0)
    const [currSong, setCurrSong] = useState(songs_list[song_list_index])

    function nextSong(){
        handleCurrSongChange(song_list_index + 1)
    }
    function previousSong(){
        handleCurrSongChange(song_list_index - 1)
    }

    const songHandler = {
        nextSongFunc:nextSong,
        previousSongFunc:previousSong
    }

    function handleCurrSongChange(id){
        const target_index = id - 1
        if(songs_list[target_index]){
            set_song_list_index(target_index)
            setCurrSong(songs_list[target_index])
            console.log("song succesfully changed.")
        }else{
            console.log("Reached the end of queue.")
        }
    }

    return(
        <>
            <SongAdder/>
            <CurrPlayingSong key={currSong.id} song = {currSong} songHandler={songHandler}/>
            <CurrQueue songs_list = {songs_list} handleSongChange={handleCurrSongChange}/>
        </>
    )
}

export default QueueView;