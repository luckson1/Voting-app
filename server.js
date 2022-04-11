const express=require('express')
const app=express()
const dotenv=require ('dotenv')
const dbConnect = require('./dbConnect')

dotenv.config()
dbConnect()

app.listen(5000, console.log('server is running on running on port 5000'))