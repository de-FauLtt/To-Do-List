const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/todolist")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
});

const LoginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const collection=new mongoose.model("users",LoginSchema);
module.exports=collection;