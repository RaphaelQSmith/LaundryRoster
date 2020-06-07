const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var rnSchema = new mongoose.Schema({
    morning :{
        friday:{
            start: String,
            finish: String,
            staff: String
        },
        saturday:{
            start: String,
            finish: String,
            staff: String
        },
        sunday:{
            start: String,
            finish: String,
            staff: String
        },
        monday:{
            start: String,
            finish: String,
            staff: String
        },
        tuesday:{
            start: String,
            finish: String,
            staff: String
        },
        wednesday:{
            start: String,
            finish: String,
            staff: String
        },
        thursday:{
            start: String,
            finish: String,
            staff: String
        }        
    },
    evening :{
        friday:{},
        saturday:{},
        sunday:{},
        monday:{},
        tuesday:{},
        wednesday:{},
        thursday:{}        
    }
});

//Export the model
module.exports = mongoose.model('Ranelagh', rnSchema);