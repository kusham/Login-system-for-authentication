const express = require("express");
const dotenv = require('dotenv');

const app = express();
dotenv.config();
app.use(express.json());

const dbConnection = require('./src/config/ConnectDataBase');
const userRoutes = require('./src/routes/UserRoutes');


dbConnection();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
} );

process.on("unhandledRejection", (error, promise) => {
    console.log(`Error : ${error}`);
    server.close(() => process.exit(1));
})


app.use('/api/user', userRoutes);