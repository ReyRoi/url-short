const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const { connectDb } = require('./config/connectDb')
const Url = require('./models/urlModel')
const userRouter = require('./routes/userRouter')
const urlRouter = require('./routes/urlRouter')
const verifyToken = require('./middleware/auth')
const PORT = process.env.PORT || 4000



connectDb();
app.use(express.json())
app.use(cookieParser());
const corsOptions = {
  origin: 'https://url-short-frontend-1thd.onrender.com', // Allow specific origin
  credentials: true, // Enable cookies or credentials
};

app.use(cors(corsOptions));

app.use('/api/users',userRouter)
app.use('/api/url',verifyToken,urlRouter)
app.get('/:shortid',verifyToken,async(req,res)=>{
    const shortid = req.params.shortid
    const data = await Url.findOneAndUpdate(
        {
            shortid
        },{
            $push:{
                history:{
                    timestamp: Date.now()
                }
            }
        }
    )
    res.redirect(data.redirectURL)
})


app.listen(PORT,()=>{
    console.log("Server is listening",PORT)
})
