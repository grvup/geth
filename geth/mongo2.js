const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/first-website",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(()=>{
    console.log("mongodb2 connected");
})
.catch(()=>{
    console.log('failed');
})
const newSchema=new mongoose.Schema({
    email:String,
    experience:String,
    name:String,
    message:String,
    occupation:String,
    states:String,
    wage:String,
    phone:Number,
    dob:Date,
    img:String,
    gender:String
})

const userinformation = mongoose.model("userinformation",newSchema)
module.exports=userinformation;

// {   "firstname":"gaurav",
//     "address":{
//     "name":"gaurav",
//     "mnumber":"123",
//     "pincode":"221402",
//     "locality":"cdA",
//     "address_1":"ijnvkadc",
//     "city":"bhadohi",
//     "state":"up",
//     "landmark":"sdcz",
//     "addtionalnumber":"89562"
// }
// }