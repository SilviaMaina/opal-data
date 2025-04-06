// --- routes/postRoutes.js ---
import express from 'express';
import { createPost, toggleLikeDislike, addComment, getAllPosts, editPost, deletePost  } from '../controllers/postController.js';

const postRouter = express.Router();

// Create a post
postRouter.post('/create', createPost);

// Toggle like/dislike
postRouter.post('/like-dislike', toggleLikeDislike);

// Add a comment
postRouter.post('/comment', addComment);

postRouter.get('/all', getAllPosts);

postRouter.put('/edit', editPost);
postRouter.delete('/delete/:postId', deletePost);

export default postRouter;