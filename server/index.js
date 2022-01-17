const express = require("express");
const dotenv = require('dotenv');

const app = express();
dotenv.config();
app.use(express.json());

const dbConnection = require('./src/config/ConnectDataBase');
const userRoutes = require('./src/routes/UserRoutes');


dbConnection();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
} );


app.use('/api/user', userRoutes);