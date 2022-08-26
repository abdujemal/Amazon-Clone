const { json } = require('express')
const User = require('../models/user')
const JWT = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 *60;

const  createToken = (id)=>{
   return JWT.sign({id}, 'amzn_clone_secret', {
        expiresIn: maxAge
    })
}


module.exports.login_post = async(req,res)=>{
    console.log(req.body);
    try{
        const {email, password} = req.body;
        const user  = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie("jwt", token, {HttpOnly: false, maxAge: maxAge * 1000})
        res.status(200).send(user)
    }catch(err){
        const errors = validateError(err)
        res.status(200).send({errors})
        console.log(err);
    }
    
}

const validateError = (err)=>{
    let errs = {email: "", password: ""}

    // incorrect email
    if (err.message === "incorrect email") {
        errs.email = 'your email or password is not correct.';
    }

    // incorrect password
    if (err.message === "incorrect password") {
        errs.password = 'That password is incorrect';
    }

    if(err.message.includes('users validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errs[properties.path] = properties.message;
        })
    }
    
    return errs
}

module.exports.signup_post = (req,res)=>{
    const {email, password, userName} = req.body;
    User.find({email: email}, (err, data)=>{
        if(err){
            console.log(err);
            res.status(400).send(err)
        }else{
            if(data.length == 0){
                User.create({email, password, userName}, (err, data)=>{
                    if(err){
                        res.status(200).send({errors:validateError(err)})
                        console.log(err);
                    }else{
                        const token = createToken(data._id)
                        res.cookie('jwt', token, {HttpOnly: true, maxAge: maxAge * 1000})
                        res.status(200).send(data)
                        console.log(data);
                    }
                })
            }else{
                res.status(200).send({
                    errors:{
                        email: "This email exists bro...",
                        password: "",
                        userName: ""
                    }})
            }
        }
    })
    
}

module.exports.logout_get = (req,res)=>{
    res.cookie('jwt', "", {HttpOnly: true, maxAge: 1})
    res.status(200).send({success: true})
}

module.exports.authenticate = (req,res)=>{
    
    console.log("Hi autenticating");
   
    const token = req.cookies.jwt
    console.log(token);
    
    if(token){
        JWT.verify(token, 'amzn_clone_secret', (err, decodedData)=>{
            if(err){
                res.status(400).send(err)
            }else{
                User.findById(decodedData.id, (err1,data)=>{
                    if(err1){
                        res.status(400).send(err1)
                        console.log(err);
                    }else{
                        console.log(data);
                        res.status(200).send(data)
    
                    }
                })
            }
        })
    }else{
        res.status(400).send("not authenticated.")
    }
    
   
}