import { createContext, useContext, useReducer } from "react";
import song_list from "../data/song_list.json";

const SongsContext = createContext(null)

const SongsDispatchContext = createContext(null)

const initial_songs_data = {
    songs_list_index:0,
    songs_list:song_list,
    currSong:song_list[0]
}


function songsReducer(songs_utils, action){
    switch(action.type){
        case 'next':{
            const target_index = songs_utils.songs_list_index + 1;
            if (songs_utils.songs_list[target_index]){
                return{
                    ...songs_utils,
                    songs_list_index: target_index,
                    currSong:songs_utils.songs_list[target_index]
                }
            }
            return songs_utils;
        }
        case 'previous': {
            const target_index = songs_utils.songs_list_index - 1;
            if (songs_utils.songs_list[target_index]){
                return{
                    ...songs_utils,
                    songs_list_index: target_index,
                    currSong:songs_utils.songs_list[target_index]
                }
            }
            return songs_utils;
        }
        case 'change_to_song': {
            const target_index = songs_utils.songs_list.findIndex(song => song.id === action.target_id);
            if (songs_utils.songs_list[target_index]){
                return {
                    ...songs_utils,
                    songs_list_index:target_index,
                    currSong:songs_utils.songs_list[target_index]
                }
            }
            return songs_utils;
        }
        case 'add_song': {
            const updatedList = [...songs_utils.songs_list, action.newSong];
            return {
                ...songs_utils,
                songs_list: updatedList
            };
        }
        default: {
            throw new Error(`Unknown action type: ${action.type}`);
        }
    }
}


function SongsProvider({ children }){
    // const songs_list = song_list

    const [songs_utils, dispatch] = useReducer(songsReducer, initial_songs_data)

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
            <SongsContext.Provider value={songs_utils}>
                <SongsDispatchContext.Provider value={dispatch}>
                    {children}
                </SongsDispatchContext.Provider>
            </SongsContext.Provider>
        </>
    )
}





function useSongs(){
    return useContext(SongsContext)
}

function useSongsDispatch(){
    return useContext(SongsDispatchContext)
}


export {
    SongsProvider,
    useSongs,
    useSongsDispatch
}