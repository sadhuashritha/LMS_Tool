const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
async function login(req,res){
    const {email,password}=req.body

    if(!email || !password ){
        return res.status(400).json({
            "message":"Inavlid Input"
        })
    }


    const existingUser =await User.findOne({email:email})

    if(!existingUser){
        return res.status(400).json({
            "message":"Email is not  registered,please register"
        })
    }
    const checkPassword = await bcrypt.compare(password,existingUser.password)
    if(!checkPassword){
        return res.status(400).json({
            "message":"wrong password"
        })
    }
    const token = jwt.sign({id:existingUser._id},process.env.SECRET_KEY)
    res.status(200).json({
        "message":"login successfully",
        "Token":token
    })


}
async function register(req,res){
    const {name,email,password,role}=req.body

    if(!name || !email || !password || !role){
        return res.status(400).json({
            "message":"Inavlid Input"
        })
    }


    const existingUser =await User.findOne({email:email})

    if(existingUser){
        return res.status(400).json({
            "message":"Email already registered"
        })
    }
    const encryptPasssword = await bcrypt.hash(password,4)
    const newUser = await User.create({
        name:name,
        email:email,
        password:encryptPasssword,
        role:role
    })

    res.status(200).json({
        "message":"user registered successfully"
    })
}


module.exports={
    login,
    register
}