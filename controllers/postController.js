// --- controllers/postController.js ---
import cloudinary from '../config/cloudinary.js';
import postModel from '../models/postModel.js';

// Create a post
export const createPost = async (req, res) => {
  try {
    const { caption, userId, file } = req.body;

    if (!file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Upload file to Cloudinary
    const uploadedResponse = await cloudinary.uploader.upload(file, {
      resource_type: 'auto', // Auto-detect image/video
    });

    const fileType = uploadedResponse.resource_type;

    // Save post to the database
    const newPost = new postModel({
      userId,
      type: fileType,
      fileUrl: uploadedResponse.secure_url,
      caption,
      likes: [],
      dislikes: [],
      comments: [],
    });

    await newPost.save();

    res.status(201).json({ success: true, message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle like/dislike
export const toggleLikeDislike = async (req, res) => {
  try {
    const { postId, userId, action } = req.body;

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    if (action === 'like') {
      if (post.likes.includes(userId)) {
        post.likes.pull(userId); // Remove like
      } else {
        post.likes.push(userId); // Add like
        post.dislikes.pull(userId); // Remove dislike if exists
      }
    } else if (action === 'dislike') {
      if (post.dislikes.includes(userId)) {
        post.dislikes.pull(userId); // Remove dislike
      } else {
        post.dislikes.push(userId); // Add dislike
        post.likes.pull(userId); // Remove like if exists
      }
    }

    await post.save();
    res.json({ success: true, message: `${action} successful`, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a comment
export const addComment = async (req, res) => {
  try {
    const { postId, userId, text } = req.body;

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const newComment = { userId, text };
    post.comments.push(newComment);
    await post.save();

    res.json({ success: true, message: 'Comment added successfully', post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Get all posts
export const getAllPosts = async (req, res) => {
    const posts = await postModel.find().sort({ createdAt: -1 });
    res.status(200).json({ posts });
  };
// Edit a post
export const editPost = async (req, res) => {
    const { postId, caption } = req.body;
    try {
      const post = await postModel.findById(postId);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      post.caption = caption || post.caption;
      await post.save();
  
      res.json({ success: true, message: "Post updated", post });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Delete a post
  export const deletePost = async (req, res) => {
    const { postId } = req.params;
    try {
      const post = await postModel.findById(postId);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      await post.deleteOne();
      res.json({ success: true, message: "Post deleted" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };  