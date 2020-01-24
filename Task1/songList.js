let express = require("express");
let app = express();
let Joi = require("@hapi/joi"); // It is the most powerful schema description language and data validator for JavaScript.
                                //joi allows you to describe your data for both input and output validation,
                                

let port = process.env.NODE_ENV || 4800;

app.use(express.json()); // This is an inbuilt middleware. Whenever we need to accept Json data we have to use this middleware. 
                        //Express provides you with the middleware to deal with the (incoming) data (object) in the body
                        // of the request. a. express.json() is a method inbuilt in express to recognize the 
                        //incoming Request Object as a JSON Object.


let songList = [{id:1,name:"Tum Hi Ho",singer:"Arijit Singh",songDuration:"4 min",albumPrice:1000},
                {id:2,name:"Tanha Dil",singer:"Shan",songDuration:"3 min",albumPrice:1000},
                {id:3,name:"Let The Music Play",singer:"Shamur",songDuration:"3.5 min",albumPrice:2000},
                {id:4,name:"Nice to Have a Friend",singer:"Taylor Swift",songDuration:"4.5 min",albumPrice:1500},
                {id:5,name:"What Do You Mean?",singer:"Justin Bieber",songDuration:"4 min",albumPrice:3000}];

// This API is to fetch entire song list
    app.get("/api/songs", (req,res)=>{
    res.send(songList); // For this request to work we should create a port.
})
//The req object represents the HTTP request and has properties for the request query
//string, parameters, body, HTTP headers, and so on.
//And The res object represents the HTTP response that an Express app sends when it gets an HTTP request.



// Fetch data by id
app.get("/api/songs/:id",(req,res)=>{
    let searchSongId = songList.find(song => song.id === parseInt(req.params.id));
    if(!searchSongId) {return res.status(400).send({message : "Invalid song id"})};
    let {id,name} = searchSongId;
    res.send(name);
})

// Add new song details here
app.post("/api/songs/newsong",(req,res)=>{
let Schema = Joi.object({
    name: Joi.string().min(3).max(50).alphanum().required(),
    singer: Joi.string().min(3).max(50).alphanum().required()
})

let result = Schema.validate(req.body);
if(result.error) {return res.send(result.error.details[0].message)};

    let addnewsong={
                    id:songList.length+1,
                    name:req.body.name, // whenever we are sending object data from front end always use body property of request object.
                                            // It Contains key-value pairs of data submitted in the request body
                    singer:req.body.singer,
                    songDuration:req.body.songDuration,
                    albumPrice:req.body.albumPrice
                    }

                    songList.push(addnewsong);
                    res.send(songList);

})

// Create port here
app.listen(port, ()=> console.log(`Port ${port} is working`));