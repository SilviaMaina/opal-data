
import mongoose from 'mongoose';
const commentSchema = new mongoose.Schema({
    userId: String,
    text: String,
  }, { timestamps: true });


const postSchema = new mongoose.Schema({
    userId: String,
    caption: String,
    fileUrl: String,
    type: String, // 'image' or 'video'
    likes: [String],
    dislikes: [String],
    comments: [commentSchema],
  }, { timestamps: true });
  

export default mongoose.model('Post', postSchema);