const mongoose = require('mongoose')
const { default: isEmail } = require('validator/lib/isEmail')
const bcrypt = require('bcrypt')

const schema = mongoose.Schema({
    email:{
        type: String,
        required: [true, "please write your email."],
        unique: true,
        lowercase: true,
        validate: [isEmail, "please write a valid email."]
    },
    password:{
        type: String,
        required: [true, "please write your password."],
        minlength: [6, "your password is less then 6 character."]
    },
    userName:{
        type: String,
        required: [true, "please write your user name."],
    }
})

schema.post('save', async(data,next)=>{
    const salt = await bcrypt.genSalt(10);    
    data.password = await bcrypt.hash(data.password, salt)
    mongoose.model("users", schema).findByIdAndUpdate(data._id, data, (err,data)=>{
        console.log(data);
    })
    next();
})


schema.statics.login = async(email, password)=>{
    try{
        const data = await mongoose.model("users", schema).findOne({email: email})
        const auth = await bcrypt.compare(password, data.password);
        if(auth){
            return data
        }else{
            throw Error("incorrect password")
        }
            
        
    }catch(err){
        throw Error("incorrect email")
    }

    
        
   
}

module.exports = mongoose.model("users", schema)