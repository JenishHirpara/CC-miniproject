const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const spaceX=new Schema({
flightNumber:Number,
rocketName:String,
launchDate:Date,
missionName:String,
missionPatchLink:String
})
const space=mongoose.model('Spaces',spaceX);
module.exports=space;
