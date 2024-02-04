const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) =>{
        cb(null,`${Date.now()}_${ file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage });


let connectToMongoose=async()=>{
    try{
await mongoose.connect(process.env.dbPath);
console.log(" successfully connect to mongodb");
}catch(err){

console.log("unable to connect to mongodb");
}

}


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static('uploads'))
app.post("/signup", upload.array("profilePic"),async(req,res)=>{
    console.log(req.body);
    console.log(req.files);
let userArr=await User.find().and({email:req.body.email})
if(userArr.length>0){
    res.json({status:"failure", msg:"user already exist."});
}else{
    let hashedPassword  = await bcrypt.hash(req.body.password,10);

    try{
        let newUser= new User({
            profilePic:req.files[0].path,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            age:req.body.age,
            email:req.body.email,
            password:hashedPassword,
            phoneNumber:req.body.phoneNumber,
        });
         await newUser.save();
         res.json({status:"success",msg:"User Created Successfully"});
        }catch(err){
            res.json({status:"failure",err:err});
        }
}
});

app.put("/updateProfile",upload.single("profilePic"),async(req,res)=>{

    console.log(req.body);
    console.log(req.file);
try{
    if(req.file && req.file.path){
        await User.updateMany(
            {email:req.body.email},
            {profilePic:req.file.path });
    }
if(req.body.firstName.length>0){
    await User.updateMany(
        {email:req.body.email},
        {firstName:req.body.firstName}
        );
}

if(req.body.lastName.length>0){
    await User.updateMany(
        {email:req.body.email},
        {lastName:req.body.lastName}
        );
}
if(req.body.password.length>0){
    await User.updateMany(
        {email:req.body.email},
        {password:req.body.password}
        );
}
if(req.body.age.length>0){
    await User.updateMany(
        {email:req.body.email},
        {age:req.body.age}
        );
}
if(req.body.phoneNumber.length>0){
    await User.updateMany(
        {email:req.body.email},
        {phoneNumber:req.body.phoneNumber}
        );
}

res.json({status:"success" , msg:"User Details update successfully"});
}catch(err){
    res.json({status:"failure" , msg:"something went wrong"})
}});

app.delete("/deleteProfile",async(req,res)=>{
 console.log(req.query.email);
try{
await  User.deleteMany({email:req.query.email});
res.json({status:"success",msg:"User deleted successfully"});
}catch(err){
    res.json({status:"failure",msg:"Unable to delete profile" ,err:err});
}



});


app.post("/login",upload.none(), async(req,res)=>{
console.log(req.body);

let fetchedData = await User.find().and({email:req.body.email})
if(fetchedData.length > 0){

  let passwordResult= await bcrypt.compare(req.body.password,fetchedData[0].password)

    if(passwordResult == true){
        let token = jwt.sign({email:req.body.email,password:req.body.email},"hahaha");
       let dataToSend={
       profilePic:fetchedData[0].profilePic,
        firstName:fetchedData[0].firstName,
        lastName:fetchedData[0].lastName,
        age:fetchedData[0].age,
        email:fetchedData[0].email, 
        phoneNumber:fetchedData[0].phoneNumber,
        token:token,
       }
       console.log(dataToSend);
    res.json({status:"success",data:dataToSend});
   }else{
    res.json({status:"failure",msg:"Invalid password"})
   }
}else{
    res.json({status:"failure" , msg:"User doesnot exist"});
}
});

app.post("/validateToken",upload.none(),async(req,res)=>{
    console.log(req.boby.token);
    let decryptedObj=jwt.verify(req.body.token,"hahaha");
    console.log(decryptedObj);
   
    try{let fetchedData = await User.find().and({email:decryptedObj.email})
    if(fetchedData.length > 0){
        if(fetchedData[0].password ==decryptedObj.password){
          let dataToSend={
        profilePic:fetchedData[0].profilePic,
            firstName:fetchedData[0].firstName,
            lastName:fetchedData[0].lastName,
            age:fetchedData[0].age,
           email:fetchedData[0].email, 
           phoneNumber:fetchedData[0].phoneNumber,
          };
          console.log(dataToSend);
       res.json({status:"success",data:dataToSend});
      }else{
       res.json({status:"failure",msg:"Invalid password"})   
        }   
     }else{
     res.json({status:"failure" , msg:"User doesnot exist"});
    }}catch(err){
res.json({status:"failure",msg:"Invalid token",err:err})
    }
});
let userSchema= new mongoose.Schema({
   profilePic:String,
    firstName:String,
    lastName:String,
    age:Number,
    email:String,
    password:String,
    phoneNumber:Number,
});
let User= new mongoose.model("user" ,userSchema);

app.listen(process.env.port,()=>{
    console.log("Listening to port 4567");
});
connectToMongoose()