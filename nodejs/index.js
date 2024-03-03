
const express=require("express");
const app=express();
const mysql=require("mysql");
const path=require("path");
const bodyParser = require("body-parser");
const con=mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"",
        database:"portfolio"
    }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const staticpath=path.join(__dirname,"../loginform");
app.use("/",express.static(staticpath));
app.get("/",(req,res)=>{
  res.sendFile(staticpath);
});
app.post("/",function(req,res)
{
    console.log(req.body);
    var name=req.body.name;
    var email=req.body.email;
    var message=req.body.message;

    con.connect((err)=>
{
    if(err)
    throw err;
var sql= "insert into form(name,email,message)values('"+name+"','"+email+"','"+message+"')";
    con.query(sql,(err,result)=>
    {
        if(err)
        throw error;
        console.log("Data added");
    })
});
    
});

app.listen(7000,()=>
{
    console.log("connect to port number 8000");
})