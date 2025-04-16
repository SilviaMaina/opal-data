import cloudinary from "../config/cloudinary.js";

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: 'auto',
  };


export const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file, opts, (error, result) => {
        if (result && result.secure_url) {
          return resolve(result.secure_url);
        }
        return reject(new Error(error.message));
      });
    });
  };