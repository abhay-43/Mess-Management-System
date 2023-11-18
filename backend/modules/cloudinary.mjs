import {v2 as cloudinary} from 'cloudinary';
import multer from 'multer';
import { cloud_name, api_key, api_secret } from '../config.mjs';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cloudinary.config({ 
    cloud_name: cloud_name, 
    api_key: api_key, 
    api_secret: api_secret
  });

async function uploadImg(file){
    const img = file.toString('base64');
    const result = await cloudinary.uploader.upload(`data:image/png;base64,${img}`,{
        folder: 'uploads',
        use_filename: true
    })
    return result.secure_url;
} 

export{ uploadImg, upload }