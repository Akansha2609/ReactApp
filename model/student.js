const mongoose = require('mongoose');

const studentSchema =  new mongoose.Schema({
	    username: {
	        type: String,
	    },
		password:{
		type: String,
		},
		date:{
		type: Date,
		default: Date.now,
		},
		description:{
		type: String,
		},	
			
		amount:{
			type: Number,
		}
	    
});


module.exports= mongoose.model('students', studentSchema);