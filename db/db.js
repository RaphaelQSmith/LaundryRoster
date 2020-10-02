const mongoose = require('mongoose');
dotenv = require('dotenv');
dotenv.config();

const uri = `${process.env.MONGODB_URL}`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

//Export module
module.exports = mongoose;