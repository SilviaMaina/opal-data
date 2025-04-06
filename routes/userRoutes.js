// routes/userRoutes.js
import express from 'express';
import { getUserProfile, uploadAvatar, followUnfollow, editUserProfile } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/profile/:userId', getUserProfile);
userRouter.put('/avatar', uploadAvatar);
userRouter.put('/follow', followUnfollow);
userRouter.put('/edit-profile', editUserProfile);

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