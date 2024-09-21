const express= require("express");
const getconnect=require("./dbconnect");
const app=express();
const collection1=require("./mongodb")

app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}))
app.get("/",(req,res)=>{
    res.render("login");
});

app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register",async (req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password
    }
    await collection1.insertMany([data]);
    let collection=await getconnect();
    let records=await collection.find({}).toArray();
    res.render("home",{records});
});

app.post("/login",async (req,res)=>{
    try{
        const check=await collection1.findOne({name:req.body.name})
        if(check.password===req.body.password){
            let collection=await getconnect();
            let records=await collection.find({}).toArray();
            res.render("home",{records});
        }
        else{
            res.send("Wrong Password");
        }
    }
    catch{
        res.send("Wrong details");
    }
});

app.get("/home",async (req,res)=>
{
    let collection=await getconnect();
    let records=await collection.find({}).toArray();
    res.render("home",{records});
});
app.get("/insert",(req,res)=>{
    res.render("insert");
});
app.post("/insertres",async (req,res)=>
{
    let gtask=req.body.gtask;
    let collection=await getconnect();
    let r=await collection.insertOne({task:gtask});
    let records=await collection.find({}).toArray();
    res.render("home",{records});
});
app.get("/deletedata",async (req,res)=>{
    let gtask=req.query.gtask;
    collection=await getconnect();
    let r=await collection.deleteOne({task:gtask});
    let records=await collection.find({}).toArray();
    res.render("home",{records});
});
app.get("/updatedata",async (req,res)=>{
    let gtask=req.query.gtask;
    let collection=await getconnect();
    let records=await collection.find({task:gtask}).toArray();
    res.render("update",{records});
});
app.post("/updateres",async (req,res)=>
    {
        let ogtask=req.body.ogtask;
        let gtask=req.body.gtask;
        let collection=await getconnect();
        let r=await collection.updateOne({task:ogtask},{$set:{task:gtask}});
        let records=await collection.find({}).toArray();
        res.render("home",{records});
    });
app.listen(5000,()=>console.log("Server is running"));