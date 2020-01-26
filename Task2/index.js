let mongoose=require("mongoose");

// Here we are creating a connection to the mongodb server using mongoose
mongoose
        .connect("mongodb://localhost/Task2_Database",{useNewUrlParser:true,useUnifiedTopology:true})
        .then(()=>console.log(`Succesfully connected to db`))
        .catch(error=>console.log(`Something went wrong could not connect to DB ${error.message}`));


// Now create Schema. Schema is nothing but a JSON object that allows us to define content of documents.
//In MongoDB collection is nothing but a table and documents are nothing but the rows and fields are columns.

let course_Schema = new mongoose.Schema({
    tags:[String],
    date:{type:Date,required:true},
    name :{type:String, min:3,max:50,required:true},
    author : {type:String,min:3,max:30,required:true},
    isPublished:{type:Boolean},
    price:{type:Number,required:true},
    
})

// Now create Model here. Model allows application to retrive and manipulate related data in a single database operation
let course_Model = mongoose.model("courses",course_Schema);

async function OnlyPublishedBackendCourses(){
    let Data= await course_Model
    .find()
    .and([{"tags":"backend"},{"isPublished":true}])
    .sort("name")
    .select("name author -_id")
     console.log("Only backend courses that are published",Data);
    
}

OnlyPublishedBackendCourses();

async function AllPublishedCoursesByPrice(){
    let Data = await course_Model
    .find()
    .and([{"isPublished":"true"}])
    .sort("-price")
    .select("name author -_id")

    console.log("Frontend and Backend published courses sorted by price in decending order",Data);


}
AllPublishedCoursesByPrice();


