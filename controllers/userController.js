import userModel from '../models/userModel.js';
import cloudinary from '../config/cloudinary.js';

export const getUserProfile = async (req, res) => {
    
  
    try {
      const user = await userModel.findById(req.params.id)
      
      if (user) {
        const { password, ...otherDetails } = user._doc;
  
        res.status(200).json(otherDetails);
      } else {
        res.status(404).json("No such User");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  
  


  

export const uploadAvatar = async (req, res) => {
  const id = req.params.id;
  const {currentUserId} = req.body;
  if (id === currentUserId)
  try {
    const uploaded = await cloudinary.uploader.upload(avatar, { folder: 'avatars' });

    const user = await userModel.findByIdAndUpdate(id,req.body,{
      new:true,
    });
    

    res.json({ success: true, message: 'Avatar updated', avatar: uploaded.secure_url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const follow = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  console.log(id, _id)
  if (_id == id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await userModel.findById(id);
      const followingUser = await userModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("you are already following this id");
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }
};

export const unfollow = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if(_id === id)
  {
    res.status(403).json("Action Forbidden")
  }
  else{
    try {
      const unFollowUser = await userModel.findById(id)
      const unFollowingUser = await userModel.findById(_id)


      if (unFollowUser.followers.includes(_id))
      {
        await unFollowUser.updateOne({$pull : {followers: _id}})
        await unFollowingUser.updateOne({$pull : {following: id}})
        res.status(200).json("Unfollowed Successfully!")
      }
      else{
        res.status(403).json("You are not following this User")
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
};




  // Edit user profile )
export const editUserProfile = async (req, res) => {
   const id = req.params.id;
    const { currentUserId } = req.body;
    if (id === currentUserId)
    try {
      const user = await userModel.findByIdAndUpdate(id,req.body,{
        new:true,
      });
      res.status(200).json({ success: true, message: 'Profile updated', user })
  
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  