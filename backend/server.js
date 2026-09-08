import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose, { mongo } from "mongoose";
import { error } from "console";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)


const app = express();
app.use(cors())
app.use(express.json())


//Connecting to MongoDB
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
.then(()=>console.log("Connected to MongoDB Atlas successfully!"))
.catch((err)=>console.error("MongoDB Connection Error:", err))

//Preparing Song Schema
const songSchema = new mongoose.Schema({
    song_name: {type: String, required: true},
    audio_url: {type: String, required: true},
    cover_url: {type: String, default: ""},
    createdAt: {type: Date, default:Date.now}
})

const Song = mongoose.model("Song", songSchema)

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

const storage = multer.memoryStorage();
const upload = multer({ storage });


const uploadToCloudinary = (fileBuffer, folder, resourceType="auto")=>{
    return new Promise((resolve, reject)=>{
        const uploadStream = cloudinary.uploader.upload_stream(
            {folder:folder, resource_type:resourceType},
            (error, result)=>{
                if (error){
                    return reject(error);
                }
                resolve(result)
            }
        );
        uploadStream.end(fileBuffer);
    });
};


app.get("/api/songs", async(req, res)=>{
    try{
        const songs = await Song.find().sort({ createdAt: -1});
        res.json(songs);
    }catch(error){
        res.status(500).json({ error: 'Failed to fetch songs.'})
    }
})


app.post("/api/upload", upload.fields([
    {name:"audio", maxCount:1},
    {name:"cover", maxCount:1}
]), async (req, res)=>{
    try{
        const { song_name } = req.body;
        const audioFile = req.files?.audio?.[0];
        const coverFile = req.files?.cover?.[0];
        
        if (!audioFile){
            return res.status(400).json({error:"Audio file is required."});
        }

        //Uploading to Cloudinary
        const audioResult = await uploadToCloudinary(
            audioFile.buffer,
            'music_player/audios',
            'video'
        );

        let coverUrl = ''
        if (coverFile){
            const coverResult = await uploadToCloudinary(
                coverFile.buffer,
                'music_player/covers',
                'image'
            );
            coverUrl = coverResult.secure_url;
        }
        
        //Instantiate mongoose Model & match cover_url property name
        const newSong = new Song({
            song_name:song_name || audioFile.originalname,
            audio_url:audioResult.secure_url,
            cover_url:coverUrl,
        })

        await newSong.save();
        
        res.status(201).json({
            message: "Upload Successful",
            song: {
                id: newSong._id,
                song_name: newSong.song_name,
                audio: newSong.audio_url,
                cover: newSong.cover_url || "data/images/default_cover.jpg"
            }
        });
    } catch (error){
        console.error("Upload Error: ", error)
        res.status(500).json({error:'Failed to upload files'});
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
