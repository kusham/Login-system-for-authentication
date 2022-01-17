const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const URI = process.env.MONGO_URI;

const dbConnection =  () => {
 mongoose.connect(URI).catch((error) => {
      console.log(error);
      console.log("Did not connect");
  })
  mongoose.connection.once("open", () => {
    console.log("Database has connected !");
  })
};

module.exports = dbConnection;

