import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Movie from './models/movie.js';
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors({
    origin:true,
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Pass url , middleware and then catch err  --> done above any app.get
mongoose.connect(process.env.MONGO_ATLUS_URL , {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Connected to the database')
})
.catch((err)=>{
    console.log(err)
})

//Controller Function

app.get('/getmovies', (req,res)=>{
    Movie.find() //Finding model in database
    .then((movies)=>{
        res.send(movies)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.post('/movies',(req,res)=>{
    const movie = new Movie({
        title:req.body.title,
        genre:req.body.genre,
        language:req.body.language,
        rating:req.body.rating
    })
    movie.save()
    .then(()=>{
    res.send('Movie added succesfully')
    })
    .catch((err)=>{
    console.log(err)
    })
})

app.delete('/movies/:id',(req,res)=>{
    const id = req.params.id;
    Movie.findByIdAndDelete({_id:id})
    .then(()=>{
        res.send('deletion successful')
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.put('/movies/:id',(req,res)=>{
    const id = req.params.id;
    Movie.findByIdAndUpdate({_id:id},{
        title:req.body.title,
        genre:req.body.genre,
        language:req.body.language,
        rating:req.body.rating
    })
    .then(()=>{
        res.send('Movie updated successfully')
    })
    .catch((err)=>{
        console.log(err)
    })
})


app.listen(process.env.PORT,()=>{
    console.log("Server is running")
})