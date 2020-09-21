const mongoose = require('mongoose');

const studentExpenseSchema =  new mongoose.Schema({
        username:{
            type: String,
        },
		date:{
        type: String,
        },
        description:{
        type: String,
        },	
            
        amount:{
            type: Number,
        }
	    
});


module.exports= mongoose.model('expenses', studentExpenseSchema);