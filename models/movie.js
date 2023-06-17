import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    genre:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    language:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:10
    }
})

const Movie = mongoose.model("Movie",movieSchema);
export default Movie;