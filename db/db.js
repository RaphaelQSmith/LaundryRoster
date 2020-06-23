const mongoose = require('mongoose');
dotenv = require('dotenv')
    dotenv.config();

const conectDB = async () =>{   
    try{
        const uri = `${process.env.MONGODB_URL}` 
        const conn = await mongoose.connect(uri, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log(`DB Connected at: ${conn.connection.host}`)
    } catch (err){
        console.log(err)
        process.exit(1)
    }
}
    //Export module
    module.exports = mongoose;