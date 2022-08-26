const Products = require('../models/product')

module.exports.products_post = (req,res)=>{
    const productData = req.body;
    Products.create(productData, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
}

module.exports.products_get = (req,res)=>{
    Products.find({}, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
}