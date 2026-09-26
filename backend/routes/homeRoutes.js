import express from "express"
import Song from "../model/song.js"

const homeRouter = express.Router()

homeRouter.get("/playlists",(req, res)=>{
    res.status(200).send({
        message:"Got your request for: Playlists"
    })
})


homeRouter.get("/songs", async (req, res)=>{
    try{

        const songs_list = await Song.find(
            {},
            "song_name cover_url"
        )

        const formattedSongs = songs_list.map(song=>({
            id:song._id,
            song_name:song.song_name,
            cover:song.cover_url || "data/images/default_cover.jpg",
            play_count:0
        }))

        res.status(200).send({
            message:"Got your request for: Songs",
            songs_list:formattedSongs
        })
        
    }catch(err){
        res.status(400).send({
            message: `Failed to fetch songs: ${err}`
        })
    }
})

export default homeRouter