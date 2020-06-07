const mongoose = require('mongoose');
dotenv = require('dotenv')
    dotenv.config();

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
// Avoid deprecated mongoDB query
mongoose.set('useFindAndModify', false);