const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var rnSchema = new mongoose.Schema({
    morning :{
        fri:{
            start: String,
            finish: String,
            staff: String
        },
        sat:{
            start: String,
            finish: String,
            staff: String
        },
        sun:{
            start: String,
            finish: String,
            staff: String
        },
        mon:{
            start: String,
            finish: String,
            staff: String
        },
        tue:{
            start: String,
            finish: String,
            staff: String
        },
        wed:{
            start: String,
            finish: String,
            staff: String
        },
        thu:{
            start: String,
            finish: String,
            staff: String
        }        
    },
    evening :{
        fri:{
            start: String,
            finish: String,
            staff: String
        },
        sat:{
            start: String,
            finish: String,
            staff: String
        },
        sun:{
            start: String,
            finish: String,
            staff: String
        },
        mon:{
            start: String,
            finish: String,
            staff: String
        },
        tue:{
            start: String,
            finish: String,
            staff: String
        },
        wed:{
            start: String,
            finish: String,
            staff: String
        },
        thu:{
            start: String,
            finish: String,
            staff: String
        }                
    }
});

//Export the model
module.exports = mongoose.model('Ranelagh', rnSchema);