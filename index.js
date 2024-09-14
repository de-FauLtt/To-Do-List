const express= require("express");
const getconnect=require("./dbconnect");
const app=express();
app.set("view engine","ejs");
app.get("/home",async (req,res)=>
{
    let collection=await getconnect();
    let records=await collection.find({}).toArray();
    res.render("home",{records});
});
app.get("/insert",(req,res)=>{
    res.render("insert");
});
app.get("/insertres",async (req,res)=>
{
    let gtask=req.query.gtask;
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
    res.render("update1",{records});
});
app.get("/updateres",async (req,res)=>
    {
        let gtask=req.query.gtask;
        let collection=await getconnect();
        let r=await collection.updateOne({task:gtask},{$set:{task:gtask}});
        let records=await collection.find({}).toArray();
        res.render("home",{records});
    });
app.listen(5000,()=>console.log("Server is running"));