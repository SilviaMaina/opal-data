import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
// import transporter from '../config/nodemailer.js';

// generate auth token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
  };
  
export const register = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
      return res.status(400).json({success: false, message:"Missing details"})  
    }
    try{

        const existingUser = await userModel.findOne({email})

        if (existingUser){
            return res.json({ success: false, message:"User already exists "});
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({name, email, password:hashedPassword});
        await user.save();

       
        res.json({ message: "registration successful", user: { id: user._id, name: user.name, email: user.email } });

    }catch (error) {
        res.json({success: false, message: error.message})
    }

}
export const login = async (req, res) => {
    const { email, password} = req.body; 
    
    if (! email || !password){
        return res.status(400).json({ success: false, message:"Email and password are required "});
    }
    try {
        const user = await userModel.findOne({email});
        if (!user){
            return res.status(400).json({sucess:false, message:"Invalid email"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch){
            return res.status(400).json({sucess:false, message:"wrong password"});
         }
         const token = generateToken(user._id);
         res,json({
            success: true,
            message:"Login successful",
            token,
            user:{id: user._id,name: user.name, email:user.email  }
         })
         

    } catch (error) {
        res.json({success: false, message: error.message});
    }


    
}

export const logOut = async (req, res) => {
    try {
      res.clearCookie( 'token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ?
        'none' : 'strict', 
      }) 
      return res.json({ success:true, message:"Logged Out"}); 


    } catch (error) {
        res.json({success: false, message: error.message});  
    }
    
}