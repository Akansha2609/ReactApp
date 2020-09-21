const express=require("express");
const passport=require("passport");

const login=require("./routes/api/login");
const dashboard=require("./routes/api/dashboard");

const app= express();

//pasport middleware
app.use(passport.initialize());

//pasport config
require("./config/passport")(passport);

app.use('/api/login',login);
app.use('/api/dashboard',dashboard);
app.get("/About",function(req,res){
  res.send("I am learning Web Development");
});

app.get("/team",function(req,res){
  res.send("I am learning Web Development");
});

app.listen(5000,function(){
  console.log("Connected to server");
});