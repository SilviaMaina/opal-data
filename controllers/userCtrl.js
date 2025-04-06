// import userModel from "../models/userModel";
// const userCtrl = {
//     searchUser: async (req, res) =>{
//         try {
//             const users = await userModel.find({
//                 username: { $regex: req.query.username },
//             })
//             .limit(10)
//             .select("fullname username avatar");
//             res.json({ users });
//         } catch (err) {
//             return res.status(500).json({ msg: err.message });

//         }
//     },

// getUser:async (req, res) => {
//     try {
//         const user = await userModel.findById(req.params.id)
//          .select("-password")
//          .populate("followers following", "-password");

//          if (!user){
//             return res.status(400).json({ msg: "requested user does not exist." });  
//          }
//          res.json({ user });
//         } catch (err) {
//             return res.status(500).json({ msg: err.message });
//     } 
    
// },
// updateUser: async (req, res) => {
//     try {
//         const { avatar, name, story} = req.body;
//         if (!name) {
//             return res.status(400).json({ msg: "Please add your full name." });  
//         }
//         await userModel.findOneAndUpdate(
//             {_id:req.user._id},
//             {avatar, name, story}
//         );
//         res.json({ msg: "Profile updated successfully." });
        
//     } catch (error) {
//         return res.status(500).json({ msg: err.message });
//     }
    
// },
// follow:async (req,res) => {
//     try {
//         const user = await userModel.find({
//             _id:req.params.id,
//             followers: req.user._id,
//         });
//         if (user.length > 0)
//             return res
//                 .status(500)
//                 .json({ msg: "You are already following this user." });
//                 const newUser = await userModel.findOneAndUpdate(
//                     { _id: req.params.id },
//                     {
//                         $push: {
//                             followers: req.user._id,
//                         },
//                     },
//                     { new: true }
//                 ).populate("followers following", "-password");
    
//                 await userModel.findOneAndUpdate(
//                     { _id: req.user._id },
//                     { $push: { following: req.params.id } },
//                     { new: true }
//                 );
    
//                 res.json({ newUser });
//     } catch (error) {
//         return res.status(500).json({ msg: err.message });
//     }

// },
// unfollow:async (req, res) => {
//     try{
//         const newUser = await userModel.findOneAndUpdate(
//             { _id: req.params.id },
//             {
//                 $pull: { followers: req.user._id },
//             },
//             { new: true }
//         ).populate("followers following", "-password");
//         await userModel.findOneAndUpdate(
//             { _id: req.user._id },
//             { $pull: { following: req.params.id } },
//             { new: true }
//         );

//         res.json({ newUser });
//     } catch (err) {
//         return res.status(500).json({ msg: err.message });
//     }
    
// },
// suggestionsUser: async (req, res) => {
//     try {
//         const newArr = [...req.user.following, req.user._id];

//         const num = req.query.num || 10;
//         const users = await userModel.aggregate([
//             { $match: { _id: { $nin: newArr } } },
//             { $sample: { size: Number(num) } },
//             {
//                 $lookup: {
//                     from: "users",
//                     localField: "followers",
//                     foreignField: "_id",
//                     as: "followers",
//                 },
//             },
//             {
//                 $lookup: {
//                     from: "users",
//                     localField: "following",
//                     foreignField: "_id",
//                     as: "following",
//                 },
//             },
//         ]).project("-password");

//         return res.json({
//             users,
//             result: users.length,
//         });
//     } catch (err) {
//         return res.status(500).json({ msg: err.message });
//     }
// },
// };

// export default userCtrl;