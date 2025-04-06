import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {type:String, required:true, unique:true}, 
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true, },
  avatar:{type:String, default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"},

  followers: [{
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
],
following: [{
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
],
saved: [{
      type: mongoose.Types.ObjectId,
      ref: 'post'
  }
],
story: {
  type: String,
  default: "",
  maxlength: 200,
},

},
{ timestamps: true}
);

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;