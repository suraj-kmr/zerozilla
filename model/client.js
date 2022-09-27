
const mongoose = require('mongoose'); 
const ClientSchema = mongoose.Schema({ 
    agencyId : { 
        type : String, 
        required : true
    }, 
    name : { 
        type : String, 
        required : true,
        unique: true,
    },
    email : { 
        type : String, 
        required : true,
    },
    phone : { 
        type : String, 
        required : true
    },
    totalBill : { 
        type : Number, 
        required : true
    },
}); 
  
const Client = module.exports = mongoose.model('Client', ClientSchema); 