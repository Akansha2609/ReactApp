const express=require("express");
const bodyParser=require('body-parser');
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const keys=require("../../config/keys");
const passport=require("passport");
const students=require("../../model/student");


var router = express.Router();




router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
//var dbName = 'Student';
const url = 'mongodb://localhost:27017/Student';
//const mongoUri = url + '/'+ dbName;

//mongoose.set('useCreateIndex', true);
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true,keepAlive: 1});
mongoose.connection.on('error', () => {
   throw new Error(`unable to connect to database: ${config.db}`);
 });

 console.log(mongoose.connection.readyState);
 mongoose.connection.on('connected', function(){
   console.log("Conected to db");
 });

router.get('/', (req, res)  => {
    //res.render('index', { title: 'Customer App', company:"IBM"});
    res.json("Hello World");
  });

router.post('/',(req,res) =>{
  const username=req.body.username;
  const password=req.body.password;
 
  students.findOne({username:username})
  .then(user => {
    if(!user){
      return res.status(404).json({username: 'user not found'}) 
    }
    else{
      console.log(user)
    }

    if(user.password === password){
      const payload=({id:user.id,username:user.username});
      //res.json({msg:"Success"})
      jwt.sign(payload,keys.secretOrKey,{expiresIn: 3600},(err,token) =>{
        res.json({
          success: true,
          token: "Bearer " + token
        })
      });
    }
    else{
     return res.status(400).json({password: 'password incorrect'})
    }
  });
  
   

}); 

router.get("/current",passport.authenticate("jwt",{session: false}),(req,res) => {
   res.json({
     id:req.user.id,
     name:req.user.username
   });
});

module.exports = router;