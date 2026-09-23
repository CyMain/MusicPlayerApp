import mongoose from 'mongoose'

const { Schema, model } = mongoose

const songSchema = new Schema({
        song_name: {
            type: String,
            required: true,
        },
        audio_url: {
            type: String,
            required: true,
        },
        cover_url: {
            type: String,
            default: "",
        },
    },
    {
        timestamps:true,
    }
)

const Song = model('Song', songSchema)
export default Song;