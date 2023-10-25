const dotenv = require('dotenv')
const app =require('./app')
const mongoose  = require('mongoose')
dotenv.config({path:'./config.env'})


const port= process.env.PORT || 6000
const DB=process.env.DB_URL


const connectDB = () => {
    //
      mongoose.connect(DB, {
            dbName:'Movies-land',
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.log("DB CONNECT on mongoose");
        })
        .catch((err) => {
          console.log("DB DONT CONNECT" + err);
        });
    };
    connectDB()
app.listen(port,()=>{
    console.log("DB Connect");
})