
const mongoose = require('mongoose'); 
const AgencySchema = mongoose.Schema({ 
    name : { 
        type : String, 
        required : true
    }, 
    address1 : { 
        type : String, 
        required : true,
    },
    address2 : { 
        type : String, 
    },
    state : { 
        type : String, 
        required : true
    },
    city : { 
        type : String, 
        required : true
    },
    phone : { 
        type : String, 
        required : true
    },
}); 
  
const Agency = module.exports = mongoose.model('Agency', AgencySchema); 