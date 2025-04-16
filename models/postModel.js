
import mongoose,{Schema} from 'mongoose';
import userModel from './userModel.js';


const postSchema = new mongoose.Schema({
  userId: {
     type: Schema.Types.ObjectId,
     ref:"userModel",
     required: true,

    },
  caption: {type: String, required : true},
  media :{type:String, required : true}, 
  likes: [],
  comments: [],
  },{
  timestamps: true,  
});
const Post = userModel.discriminator('Post', postSchema)
  

export default Post;