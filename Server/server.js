const express=require('express')
const app=express()
const cors = require("cors");

const dotenv=require ('dotenv')
const dbConnect = require('./dbConnect');
const authRoutes  = require('./routes/users/Auth');
const { notFound, errorHandler } = require('./middlewear/errorMiddleware');
const passRoutes = require('./routes/users/passwords');
const userRoutes = require('./routes/users/Users');
const manualVotesRoute = require('./routes/ManualVotes/manualVotes');
const awardsRoute = require('./routes/Awards/Awards');
const awardCategoryRoute = require('./routes/awardCategory/awardCategory');
const contestantRoute = require('./routes/contestants/Contestants');



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

//passwords routes
app.use('/api/password', passRoutes);

//user passRoutes
app.use('/api/users', userRoutes)

//manual votes
app.use('/api/votes', manualVotesRoute)

//awards routes
app.use('api/awards', awardsRoute)

//Category routes
app.use('api/awardCategories', awardCategoryRoute)

//contestants routes
app.use('api/contestants', contestantRoute)

//errors

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`server is running on running on port ${5000}`))