const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

const authRouter = require('./routes/authRoutes')
const productsRouter = require('./routes/productsRoutes')
const cookieParser = require('cookie-parser')


const url = "mongodb+srv://admin:b79UBHQQh6LaysNu@amznclone.8flemzw.mongodb.net/AmznClone?retryWrites=true&w=majority"

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
  next()
})

app.use(cookieParser())

// app.use(cors())

app.use(express.json())

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    (_)=>app.listen(process.env.PORT || 4000, ()=>{
    
                console.log("Server Started....");
})).catch((err)=>{
    console.log(err);
})


app.use("/api/v1", authRouter)

app.use("/api/v1/products", productsRouter)