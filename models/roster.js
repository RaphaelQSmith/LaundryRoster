const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var rosterSchema = new mongoose.Schema({
    date: String,
    store: String,
     mor :{
        shiftM: String, 
        friM: String,
        satM: String,
        sunM: String,
        monM:String,
        tueM:String,
        wedM:String,
        thuM:String    
    },
    eve :{
        shiftE: String,
        friE: String,
        satE: String,
        sunE: String,
        monE:String,
        tueE:String,
        wedE:String,
        thuE:String                
    },
});

//Export the model
module.exports = mongoose.model('Ranelagh', rosterSchema);