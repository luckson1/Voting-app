const express=require('express')
const app=express()
const cors = require("cors");


const dotenv=require ('dotenv')
const dbConnect = require('./dbConnect');
const authRoutes  = require('./routes/users/Auth');
const { notFound, errorHandler } = require('./middlewear/errorMiddleware');


// allow our node process to have access to the environment variables
dotenv.config()

// connect to database
dbConnect()

// creating port
const PORT= 5000

// middleware

app.use(cors());
app.use(express.json());

//routes

//Users auth routes
app.use("/api/auth", authRoutes);

//errors

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`server is running on running on port ${5000}`))