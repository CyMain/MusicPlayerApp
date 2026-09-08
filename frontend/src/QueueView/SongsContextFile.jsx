import { createContext, useContext, useEffect, useReducer } from "react";
import song_list from "../data/song_list.json";

const SongsContext = createContext(null);
const SongsDispatchContext = createContext(null);

const initial_songs_data = {
    songs_list_index: 0,
    songs_list: song_list,
    currSong: song_list[0],
    loading: true
};

function songsReducer(songs_utils, action) {
    switch (action.type) {
        case 'set_songs': {
            const fetchedList = action.songs.length > 0 ? action.songs : songs_utils.songs_list;
            const currentIndex = songs_utils.songs_list_index;
            return {
                ...songs_utils,
                songs_list: fetchedList,
                currSong: fetchedList[currentIndex] || fetchedList[0],
                loading: false
            };
        }
        case 'add_song': {
            const updatedList = [action.newSong, ...songs_utils.songs_list];
            return {
                ...songs_utils,
                songs_list: updatedList,
                currSong: songs_utils.currSong || action.newSong
            };
        }
        case 'next': {
            const target_index = songs_utils.songs_list_index + 1;
            if (songs_utils.songs_list[target_index]) {
                return {
                    ...songs_utils,
                    songs_list_index: target_index,
                    currSong: songs_utils.songs_list[target_index]
                };
            }
            return songs_utils;
        }
        case 'previous': {
            const target_index = songs_utils.songs_list_index - 1;
            if (songs_utils.songs_list[target_index]) {
                return {
                    ...songs_utils,
                    songs_list_index: target_index,
                    currSong: songs_utils.songs_list[target_index]
                };
            }
            return songs_utils;
        }
        case 'change_to_song': {
            const target_index = songs_utils.songs_list.findIndex(song => song.id === action.target_id);
            if (songs_utils.songs_list[target_index]) {
                return {
                    ...songs_utils,
                    songs_list_index: target_index,
                    currSong: songs_utils.songs_list[target_index]
                };
            }
            return songs_utils;
        }
        default: {
            throw new Error(`Unknown action type: ${action.type}`);
        }
    }
}

function SongsProvider({ children }) {
    const [songs_utils, dispatch] = useReducer(songsReducer, initial_songs_data);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/songs");

                if (!response.ok) {
                    throw new Error(`Failed to fetch songs. Server status: ${response.status}`);
                }

                const songData = await response.json();
                dispatch({ type: "set_songs", songs: songData });
            } catch (error) {
                console.error(`Failed to load tracks from DB: ${error}`);
            }
        };

        fetchSongs();
    }, []);

    return (
        <SongsContext.Provider value={{ songs_utils, currSong: songs_utils.currSong, dispatch }}>
            <SongsDispatchContext.Provider value={dispatch}>
                {children}
            </SongsDispatchContext.Provider>
        </SongsContext.Provider>
    );
}

function useSongs() {
    return useContext(SongsContext);
}

function useSongsDispatch() {
    return useContext(SongsDispatchContext);
}

export {
    SongsProvider,
    useSongs,
    useSongsDispatch
};