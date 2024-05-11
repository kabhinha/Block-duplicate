const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file,folder) => {
   
            const options = {folder,
            upload_present: `unsigned_upload`,
            public_id: `postimage`,
            innerWidth:400,
            innerHeight:260,
            allowed_formats :['png','jpg','jpeg','svg', 'ico', 'jfif','webp']
            };
       
            options.resource_type = "auto";


            let response;
            await cloudinary.uploader.upload(file, ).then(result => response = result);
            return response;

        }
   