import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
// user login route
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

const userLogin = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"please enter valid email"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            const token = createToken(user._id);
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"invalid credentials"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
};
const userRegister = async(req,res)=>{
    try {
       const {name,email,password} = req.body;
       const exits = await userModel.findOne({email});
       if(exits){
        return res.json({success:false,message:'user already exits'})
       }
       // validating email format and strong password
       if(!validator.isEmail(email)){
        return res.json({success:false,message:'Please enter a valid email'})
       }
       if(password.length < 8){
        return res.json({success:false,message:'Please enter a strong password'})
       }
       // hashing user password
       const salt = await bcrypt.genSalt(10);
       const hashpass = await bcrypt.hash(password,salt);
       const newUser = new userModel({
        name,email,
        password:hashpass
       });
       const user = await newUser.save();
       const token = createToken(user._id);
       res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }

};
const adminLogin = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email + password,process.env.JWT_SECRET);
            res.json({success:true,token});
        }else{
            res.json({success:false,message:"login fail"})
        }
            
    } catch (error) {
         console.log(error);
        res.json({success:false,message:error.message});
    }

}
export {
    userLogin,
    userRegister,
    adminLogin
}