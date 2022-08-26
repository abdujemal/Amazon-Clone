const mongoose = require('mongoose')

const schema = mongoose.Schema({
        img: {
            type:String,
            required: true
        }, 
        name: {
            type:String,
            required: true
        }, 
        price: {
            type:Number,
            required: true
        }, 
        ratings: {
            type:Number,
            required: true
        }
    })

module.exports = mongoose.model('Products', schema)