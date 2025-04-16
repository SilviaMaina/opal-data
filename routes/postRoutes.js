// --- routes/postRoutes.js ---
import express from 'express';
import { createPost, toggleLikeDislike, addComment, getAllPosts, editPost, deletePost  } from '../controllers/postController.js';
import { uploadImage } from '../controllers/uploadImage.js';

const postRouter = express.Router();

// Create a post
postRouter.post('/create', createPost);

// Toggle like/dislike
postRouter.post('/like-dislike', toggleLikeDislike);

// Add a comment
postRouter.post('/comment', addComment);

postRouter.get('/all', getAllPosts);

postRouter.patch('/edit', editPost);
postRouter.delete('/delete/:postId', deletePost);

//upload images
postRouter.post('/uploadImage', async (req, res) => {
    const { media } = req.body; // Assuming the image is being sent in base64 format in the request body

    if (!media) {
        return res.status(400).json({ error: "Media data is required" });
    }

    try {
        const mediaUrl = await uploadImage(media); // Call the uploadImage function from Cloudinary logic
        res.status(200).json({ mediaUrl }); // Return the secure image URL in response
    } catch (error) {
        console.error("Error uploading image:", error); // Log the error details
        res.status(500).json({ error: error.message }); // Handle errors
    }
});

export default postRouter;