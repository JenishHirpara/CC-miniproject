const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const SpaceX=require('./mongo.js')
const mongoose=require('mongoose');
const key=require('./config/key')
const fetch=require('node-fetch')
const cors=require('cors')
app.listen(3000,()=>{
    console.log("listening u on port 3000, don't worry")
})

app.use(express.json({limit:'50mb'}));
app.use(express.static('public'));
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.connect(key.database)
mongoose.connection.on('connected',()=>{
    console.log("connected to db")
})

app.get('/api',async (req,res)=>{
    const response=await fetch('https://api.spacexdata.com/v2/launches')
    const json=await response.json();
    res.send(json)
})

app.post('/api',async (req,res)=>{
    const datas=req.body;
    console.log(datas);
    res.send({wish:"Congratulations, data successfully saved"})
    datas.forEach(data => {
        const space=new SpaceX({
            flightNumber:data.flight_number,
        rocketName:data.rocket.rocket_name,
        launchDate:data.launch_year,
        missionName:data.mission_name,
        missionPatchLink:data.links.mission_patch
        })
        space.save().then(res=>console.log(res))
    });
   
})
