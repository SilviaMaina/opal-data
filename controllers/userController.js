import userModel from '../models/userModel.js';
import cloudinary from '../config/cloudinary.js';

export const getUserProfile = async (req, res) => {
    const { userId } = req.params;
  
    if (!userId || userId === ':userId') {
      return res.status(400).json({ message: 'Invalid user ID in URL' });
    }
  
    try {
      const user = await userModel.findById(userId).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json({ user });
    } catch (error) {
      console.error("Server error in getUserProfile:", error.message);
      res.status(500).json({ message: error.message });
    }
  };
  

export const uploadAvatar = async (req, res) => {
  const { userId, avatar } = req.body;
  try {
    const uploaded = await cloudinary.uploader.upload(avatar, { folder: 'avatars' });

    const user = await userModel.findById(userId);
    user.avatar = uploaded.secure_url;
    await user.save();

    res.json({ success: true, message: 'Avatar updated', avatar: uploaded.secure_url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const followUnfollow = async (req, res) => {
    const { currentUserId, targetUserId } = req.body;
    try {
      const currentUser = await userModel.findById(currentUserId);
      const targetUser = await userModel.findById(targetUserId);
  
      if (!targetUser) return res.status(404).json({ message: 'User not found' });
  
      const isFollowing = currentUser.following.includes(targetUserId);
  
      if (isFollowing) {
        currentUser.following.pull(targetUserId);
        targetUser.followers.pull(currentUserId);
        await currentUser.save();
        await targetUser.save();
        return res.json({ success: true, message: 'Unfollowed' });
      } else {
        currentUser.following.push(targetUserId);
        targetUser.followers.push(currentUserId);
        await currentUser.save();
        await targetUser.save();
        return res.json({ success: true, message: 'Followed' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  // Edit user profile (name and story)
export const editUserProfile = async (req, res) => {
    const { userId, name, story } = req.body;
    try {
      const user = await userModel.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      if (name) user.name = name;
      if (story) user.story = story;
  
      await user.save();
  
      res.json({ success: true, message: 'Profile updated', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  