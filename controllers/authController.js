import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
// import transporter from '../config/nodemailer.js';


  
export const register = async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({success: false, message:"Missing details"})  
      }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({name, email, password:hashedPassword});

    
    try{

        const existingUser = await userModel.findOne({email})

        if (existingUser){
            return res.json({ success: false, message:"User already exists "});
        }


       
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    

       
        res.status(200).json({ message: "registration successful", user: { id: user._id, name: user.name, email: user.email } ,token});

    }catch (error) {
        res.status(500).json({success: false, message: error.message})
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
         const token  = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
         res.json({
            success: true,
            message:"Login successful",
            token,
            user:{id: user._id,name: user.name, email:user.email  }
         })
         

    } catch (error) {
        res.status(500).json({success: false, message: error.message});
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