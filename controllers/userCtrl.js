// // import userModel from "../models/userModel";
// // const userCtrl = {
// //     searchUser: async (req, res) =>{
// //         try {
// //             const users = await userModel.find({
// //                 username: { $regex: req.query.username },
// //             })
// //             .limit(10)
// //             .select("fullname username avatar");
// //             res.json({ users });
// //         } catch (err) {
// //             return res.status(500).json({ msg: err.message });

// //         }
// //     },

// // getUser:async (req, res) => {
// //     try {
// //         const user = await userModel.findById(req.params.id)
// //          .select("-password")
// //          .populate("followers following", "-password");

// //          if (!user){
// //             return res.status(400).json({ msg: "requested user does not exist." });  
// //          }
// //          res.json({ user });
// //         } catch (err) {
// //             return res.status(500).json({ msg: err.message });
// //     } 
    
// // },
// // updateUser: async (req, res) => {
// //     try {
// //         const { avatar, name, story} = req.body;
// //         if (!name) {
// //             return res.status(400).json({ msg: "Please add your full name." });  
// //         }
// //         await userModel.findOneAndUpdate(
// //             {_id:req.user._id},
// //             {avatar, name, story}
// //         );
// //         res.json({ msg: "Profile updated successfully." });
        
// //     } catch (error) {
// //         return res.status(500).json({ msg: err.message });
// //     }
    
// // },
// // follow:async (req,res) => {
// //     try {
// //         const user = await userModel.find({
// //             _id:req.params.id,
// //             followers: req.user._id,
// //         });
// //         if (user.length > 0)
// //             return res
// //                 .status(500)
// //                 .json({ msg: "You are already following this user." });
// //                 const newUser = await userModel.findOneAndUpdate(
// //                     { _id: req.params.id },
// //                     {
// //                         $push: {
// //                             followers: req.user._id,
// //                         },
// //                     },
// //                     { new: true }
// //                 ).populate("followers following", "-password");
    
// //                 await userModel.findOneAndUpdate(
// //                     { _id: req.user._id },
// //                     { $push: { following: req.params.id } },
// //                     { new: true }
// //                 );
    
// //                 res.json({ newUser });
// //     } catch (error) {
// //         return res.status(500).json({ msg: err.message });
// //     }

// // },
// // unfollow:async (req, res) => {
// //     try{
// //         const newUser = await userModel.findOneAndUpdate(
// //             { _id: req.params.id },
// //             {
// //                 $pull: { followers: req.user._id },
// //             },
// //             { new: true }
// //         ).populate("followers following", "-password");
// //         await userModel.findOneAndUpdate(
// //             { _id: req.user._id },
// //             { $pull: { following: req.params.id } },
// //             { new: true }
// //         );

// //         res.json({ newUser });
// //     } catch (err) {
// //         return res.status(500).json({ msg: err.message });
// //     }
    
// // },
// // suggestionsUser: async (req, res) => {
// //     try {
// //         const newArr = [...req.user.following, req.user._id];

// //         const num = req.query.num || 10;
// //         const users = await userModel.aggregate([
// //             { $match: { _id: { $nin: newArr } } },
// //             { $sample: { size: Number(num) } },
// //             {
// //                 $lookup: {
// //                     from: "users",
// //                     localField: "followers",
// //                     foreignField: "_id",
// //                     as: "followers",
// //                 },
// //             },
// //             {
// //                 $lookup: {
// //                     from: "users",
// //                     localField: "following",
// //                     foreignField: "_id",
// //                     as: "following",
// //                 },
// //             },
// //         ]).project("-password");

// //         return res.json({
// //             users,
// //             result: users.length,
// //         });
// //     } catch (err) {
// //         return res.status(500).json({ msg: err.message });
// //     }
// // },
// // };

// // export default userCtrl;


// import bcrypt from 'bcryptjs'
// import userModel from '../models/userModel.js';
// import jwt from 'jsonwebtoken';
// // import transporter from '../config/nodemailer.js';

// // generate auth token
// const generateToken = (userId) => {
//     return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
//   };
  
// export const register = async (req, res) => {
//     const {name, email, password} = req.body;

//     if(!name || !email || !password){
//       return res.status(400).json({success: false, message:"Missing details"})  
//     }
//     try{

//         const existingUser = await userModel.findOne({email})

//         if (existingUser){
//             return res.json({ success: false, message:"User already exists "});
//         }
        


//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new userModel({name, email, password:hashedPassword});
//         await user.save();

       
//         res.json({ message: "registration successful", user: { id: user._id, name: user.name, email: user.email } });

//     }catch (error) {
//         res.json({success: false, message: error.message})
//     }

// }
// export const login = async (req, res) => {
//     const { email, password} = req.body; 
    
//     if (! email || !password){
//         return res.status(400).json({ success: false, message:"Email and password are required "});
//     }
//     try {
//         const user = await userModel.findOne({email});
//         if (!user){
//             return res.status(400).json({sucess:false, message:"Invalid email"})
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//          if (!isMatch){
//             return res.status(400).json({sucess:false, message:"wrong password"});
//          }
//          const token = generateToken(user._id);
//          res.json({
//             success: true,
//             message:"Login successful",
//             token,
//             user:{id: user._id,name: user.name, email:user.email  }
//          })
         

//     } catch (error) {
//         res.json({success: false, message: error.message});
//     }


    
// }

// export const logOut = async (req, res) => {
//     try {
//       res.clearCookie( 'token', {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: process.env.NODE_ENV === 'production' ?
//         'none' : 'strict', 
//       }) 
//       return res.json({ success:true, message:"Logged Out"}); 


//     } catch (error) {
//         res.json({success: false, message: error.message});  
//     }
    
// }