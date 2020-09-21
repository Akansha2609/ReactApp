const express=require("express");
const mongoose=require("mongoose");
const router = express.Router();
const passport=require("passport");

const students=require("../../model/student");
const expense=require("../../model/studentExpense");



router.get('/', passport.authenticate('jwt',{session: false}),(req,res) => {
    const errors= {};
    console.log(req.user.username);
    expense.find({username: req.user.username}).
     then(expense => {
         if(!expense){
             console.log("Test")
             errors.noexpense ="There is no expense detail added for this student";
             return res.status(404).json({username: "There is no expense detail added for this student"});
         }else{
            console.log(req.user.username);
            console.log(expense);
            res.json(expense);
         }
         
     })
     .catch(err => res.status(404).json(err));

});

module.exports = router;