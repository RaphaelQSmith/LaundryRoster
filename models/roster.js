const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var rosterSchema = new mongoose.Schema({
    Store: String,
     morning :{
        fri: String,
        sat: String,
        sun: String,
        mon:String,
        tue:String,
        wed:String,
        thu:String    
    },
    evening :{
        fri: String,
        sat: String,
        sun: String,
        mon:String,
        tue:String,
        wed:String,
        thu:String                
    }
});

//Export the model
module.exports = mongoose.model('Ranelagh', rosterSchema);