const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var rosterSchema = new mongoose.Schema({
    date: String,
    store: String,
     mor :{
        shift: String, 
        fri: String,
        sat: String,
        sun: String,
        mon:String,
        tue:String,
        wed:String,
        thu:String    
    },
    eve :{
        shift: String,
        fri: String,
        sat: String,
        sun: String,
        mon:String,
        tue:String,
        wed:String,
        thu:String                
    },
});

//Export the model
module.exports = mongoose.model('Ranelagh', rosterSchema);