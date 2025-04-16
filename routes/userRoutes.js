// routes/userRoutes.js
import express from 'express';
import { getUserProfile, uploadAvatar, follow,unfollow, editUserProfile } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/profile/:id', getUserProfile);
userRouter.patch('/avatar', uploadAvatar);
userRouter.patch('/follow/:id', follow);
userRouter.patch('/unfollow/:id', unfollow);
userRouter.patch('/edit-profile/:id', editUserProfile);

export default userRouter;



// import express from 'express';
// import userCtrl from '../controllers/userCtrl';

// const userRouter = express.Router();

// userRouter.get('/search',userCtrl.searchUser);
// userRouter.get('/user/:id',userCtrl.getUser);
// userRouter.get('/user',userCtrl.updateUser);
// userRouter.get('/user/id/follow',userCtrl.follow);
// userRouter.get('/user/id/ufollow',userCtrl.unfollow);
// userRouter.get('/suggestionsUser',userCtrl.suggestionsUser);

// export default userRouter;