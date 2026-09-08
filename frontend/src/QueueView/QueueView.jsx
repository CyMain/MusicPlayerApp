import { useRef, useState, useEffect } from "react";
import song_list from "../data/song_list.json";
import { SongsProvider, useSongs, useSongsDispatch } from "./SongsContextFile";
import './QueueView.css';


const CurrSongCover = ()=>{
    const { currSong } = useSongs();

    return(
        <>
            <figure className="song-cover">
                <img src={currSong.cover} alt={currSong.song_name} />
            </figure>
        </>
    )
}

const SongControls = ()=>{
    const { currSong } = useSongs();
    const dispatch = useSongsDispatch();

    const audio_tag = useRef(null)
    const progress_ref = useRef(null)
    const fakeFillRef = useRef(null)
    const [is_playing, setIsPlaying] = useState(false)

    function pauseSong(){
        audio_tag.current?.pause()
        setIsPlaying(false)
    }
    function playSong(){
        audio_tag.current?.play()
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
            dispatch({ type:"previous" })
        }else if(instruction == "next"){
            pauseSong()
            dispatch({ type:"next" })
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
                    {currSong?.song_name}
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
                    src={currSong?.audio}
                    ref={audio_tag}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={()=>setIsPlaying(false)}
                ></audio>
            </div>
        </>
    )
}

const CurrPlayingSong = () =>{
    const { currSong } = useSongs();

    console.log(`At CurrPlayingSong songs_utils is: ${currSong}`)

    return(
        <>
            <div className="song-controller">
                <CurrSongCover key={currSong.id}/>
                <SongControls key={`ctrl-${currSong.id}`}/>
            </div>
        </>
    )
}

// Queue Components
const QueueItem = ({ item }) =>{
    const dispatch = useSongsDispatch();

    return(
        <>
            <li 
                className="queue-item"
                onClick={()=>dispatch({ type:'change_to_song', target_id:item.id })}
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

const CurrQueue = ()=>{
    const { songs_list } = useSongs();

    return(
        <>
            <h1 className="queue-title">Your Queue</h1>
            <div
                className="queue-header"
            >
                <h4 className="cover-header">
                    Cover
                </h4>
                <h4 className="song-name-queue">
                    Title
                </h4>
            </div>
            <ul className="queue">
                {
                    songs_list.map(
                        (item) => <QueueItem item={item} key={item.id}/>
                    )
                }
            </ul>
        </>
    )
}

const SongAdder = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [stagedSong, setStagedSong] = useState(null);
    const [songName, setSongName] = useState("");
    const songNameRef = useRef(null);

    // Ref counter prevents false dragleave triggers when dragging over child elements
    const dragCounter = useRef(0);
    const dispatch = useSongsDispatch();

    // Sample Data:
    // {
    //     songName:"Sonic Adventure 2 - Live and Learn",
    //     songCover:"/data/images/sonic_adventure_2_live_and_learn_cover.jpg",
    //     songAudio:"/data/audios/sonic_adventure_2_live_and_learn_audio.mp3"
    // }


    useEffect(() => {
        // Prevent default browser opening of files anywhere on the page
        const preventDefaults = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const handleDragEnter = (e) => {
            preventDefaults(e);
            dragCounter.current += 1;
            
            // Only flag dragging if items exist in the drag event
            if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
                setIsDragging(true);
            }
        };

        const handleDragOver = (e) => {
            preventDefaults(e);
            // Necessary to allow dropping
            e.dataTransfer.dropEffect = "copy";
        };

        const handleDragLeave = (e) => {
            preventDefaults(e);
            dragCounter.current -= 1;
            
            // Only hide when the cursor completely leaves the window viewport
            if (dragCounter.current === 0) {
                setIsDragging(false);
            }
        };

        const handleDrop = (e) => {
            preventDefaults(e);
            setIsDragging(false);
            dragCounter.current = 0;

            const files = e.dataTransfer.files;
            if (files && files.length > 0) {
                const file = files[0];
                
                // Allow audio mime types or file extensions matching audio formats
                if (file.type.startsWith("audio/") || file.name.match(/\.(mp3|wav|ogg|m4a|flac)$/i)) {
                    const audioUrl = URL.createObjectURL(file);
                    const cleanName = file.name.replace(/\.[^/.]+$/, "");
                    setStagedSong({ file, audioUrl });
                    setSongName(cleanName);
                } else {
                    alert("Please drop a valid audio file (.mp3, .wav, etc.).");
                }
            }
            //FileList {0: File, length: 1}
            // 0 : File
            // lastModified : 1787331503120
            // lastModifiedDate : Fri Aug 21 2026 17:58:23 GMT+0100 (West Africa Time) {}
            // name : "I don't play 'bout you #JerseyClub.mp3"
            // size : 2619487
            // type : "audio/mpeg"
            // webkitRelativePath : ""
            console.log(files)
        };

        // Attach listeners directly to window
        window.addEventListener("dragenter", handleDragEnter);
        window.addEventListener("dragover", handleDragOver);
        window.addEventListener("dragleave", handleDragLeave);
        window.addEventListener("drop", handleDrop);

        return () => {
            window.removeEventListener("dragenter", handleDragEnter);
            window.removeEventListener("dragover", handleDragOver);
            window.removeEventListener("dragleave", handleDragLeave);
            window.removeEventListener("drop", handleDrop);
        };
    }, []);

    function handleCancel(){
        setStagedSong(null)
    }

    async function handleAddSong(e){
        e.preventDefault();
        if (!stagedSong){
            return;
        }

        const formData = new FormData();
        formData.append("song_name", songName);
        formData.append("audio", stagedSong.file);

        // Check if cover file input exists
        const coverFileInput = document.getElementById("song-cover");
        if (coverFileInput?.files[0]) {
            formData.append("cover", coverFileInput.files[0]);
        }

        try{
            const response = await fetch("http://localhost:5000/api/upload", {
                method:"POST",
                body:formData,
            });


            // Check HTTP status code (200-299) before parsing JSON
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server Error (${response.status}): ${errorText}`);
            }


            const data = await response.json();

            if (response.ok){
                dispatch({ type:"add_song", newSong:data.song });
                setStagedSong(null);
                setSongName("");
            }
            

        } catch (error) {
            console.error(`Failed to upload song: ${error}`)
        }

        // const newSong = {
        //     id:Date.now(),
        //     song_name: songName,
        //     cover: "data/images/default_cover.jpg",
        //     audio: stagedSong.audioUrl
        // }

        // dispatch({type: "add_song", newSong});
        // setStagedSong(null);
        // setSongName("");
    }
    return(
        <>
            {
                isDragging && (
                    <>
                        <div className="song-adder-dragging-overlay">
                            <p>Drag and drop your song here</p>
                        </div>
                    </>
                )
            }

            {
                stagedSong && (
                    <>
                        <div className="song-adder-dragging-overlay">
                            <form action="" className="song-adder-form"
                                onSubmit={handleAddSong}
                            >
                                <label htmlFor="song-name">Song Name:</label>
                                <input
                                    type="text"
                                    id="song-name"
                                    placeholder="Enter song name"
                                    ref={songNameRef}
                                    value={songName}
                                    onChange={(e)=>setSongName(e.target.value)}
                                />
                                <label htmlFor="song-cover">Song Cover:</label>
                                <input type="file" id="song-cover" accept="image/*" />
                                <div className="form-buttons">
                                    <button type="button" className="cancel-button" onClick={handleCancel}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="add-song-button">
                                        Add Song
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )
            }
        </>
    )
}

const QueueView = ()=>{
    // const songs_list = song_list 
    // const [song_list_index, set_song_list_index] = useState(0)
    // const [currSong, setCurrSong] = useState(songs_list[song_list_index])

    // function nextSong(){
    //     handleCurrSongChangeByIndex(song_list_index + 1)
    // }
    // function previousSong(){
    //     handleCurrSongChangeByIndex(song_list_index - 1)
    // }

    // const songHandler = {
    //     nextSongFunc:nextSong,
    //     previousSongFunc:previousSong
    // }

    // function handleCurrSongChangeByIndex(index){
    //     if(songs_list[index]){
    //         set_song_list_index(index)
    //         setCurrSong(songs_list[index])
    //         console.log(`song succesfully changed to ${songs_list[index].song_name}.`)
    //     }else{
    //         console.log("Reached the end of queue.")
    //     }
    // }

    // function handleCurrSongChangeByID(id){
    //     const target_index = id - 1
    //     if(songs_list[target_index]){
    //         set_song_list_index(target_index)
    //         setCurrSong(songs_list[target_index])
    //         console.log(`song succesfully changed to ${songs_list[target_index].song_name}.`)
    //     }else{
    //         console.log("Reached the end of queue.")
    //     }
    // }

    return(
        <>
            <SongsProvider>    
                <div className="queue-view">
                    <SongAdder/>
                    <CurrPlayingSong/>
                    <CurrQueue/>
                </div>
            </SongsProvider>
        </>
    )
}

export default QueueView;