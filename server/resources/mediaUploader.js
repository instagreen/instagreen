const cloudinary = require('cloudinary');
const { cloudinaryCredentials } = require('./config');
const path = require('path');
const fs = require('fs');

// ======================= helpers
const removeTempFile = (tempFilePath, cb) => {
  fs.unlink(tempFilePath, (err) => {
    if (err) {
      throw err;
    }
    console.log(`${tempFilePath} was deleted`);
    if (cb) {
      cb();
    }
  });
};

// ======================= media saver

module.exports.saveMediaToUploads = (files, cb) => {
  // console.log('-----> File for reals ', files);
  // example of files[0]
  // {
  //   fieldname: '',
  //   originalname: 'test.png',
  //   encoding: '7bit',
  //   mimetype: 'image/png',
  //   destination: 'uploads',
  //   filename: '0ff280cd055b8deea89cbbfef5dbc0b6',
  //   path: 'uploads/0ff280cd055b8deea89cbbfef5dbc0b6',
  //   size: 288024
  // }
  const file = files[0] || files;
  const fileNameParts = file.originalname.split('.');
  const fileName = fileNameParts[0];
  const extention = fileNameParts[1];

  // file arrives with a random name and no extention
  const tmpPath = file.path;

  // putting together the original name with a random number (Date.now)
  // to avoid collisions and the extention at the end
  const targetPath = `uploads/${fileName}-${Date.now()}.${extention}`;

  // creating the actual files from the uploaded streams
  const src = fs.createReadStream(tmpPath);
  const dest = fs.createWriteStream(targetPath);
  src.pipe(dest);
  src.on('end', () => { 
    console.log('im done saving the file');
    // remove the temp file and invoke the callback
    removeTempFile(tmpPath);
    cb(targetPath);
  });
  src.on('error', (err) => { console.log('error saving file', err); });
};

// ======================= media uploaders to cloudinary

cloudinary.config({ // cloudinary setup and configuration
  cloud_name: cloudinaryCredentials.name,
  api_key: cloudinaryCredentials.apiKey,
  api_secret: cloudinaryCredentials.apiSecret,
});

// upload media to cloudinary storage
module.exports.uploadMediaToStorage = (filePath, callback) => {
  // This method will only upload files up to 100 MB in size.
  // To upload larger files, use the chunked video upload method.
  // const mediaPath = path.join(__dirname, filePath);
  cloudinary.v2.uploader.upload(filePath, { resource_type: 'auto' }, (error, storedMediaInfo) => {
    if (error) {
      console.log('error while uploading to cloudinary', error);
    }
    callback(storedMediaInfo);
  });
};

// ======================= media deleter
module.exports.deleteMediaFromCloudinary = (public_id, callback) => {
  cloudinary.v2.uploader.destroy(public_id, (error, result) => {
    if (error) {
      console.log('error while trying to delete media from cloudinary', error);
    }
    console.log('Media file deleted from cloudinary', result);
    callback(result);
  });
};

// uploadMediaToStorage(path.join(__dirname, './test.png'));

// cloudinary response sample
// {
//   "public_id": "eneivicys42bq5f2jpn2",
//   "version": 1473596672,
//   "signature": "abcdefghijklmnopqrstuvwxyz12345",
//   "width": 1000,
//   "height": 672,
//   "access_mode": "public",
//   "format": "jpg",
//   "resource_type": "image",
//   "created_at": "2017-08-11T12:24:32Z",
//   "tags": [

//   ],
//   "bytes": 350749,
//   "type": "upload",
//   "etag": "5297bd123ad4ddad723483c176e35f6e",
//   "url": "http://res.cloudinary.com/demo/image/upload/v1473596672/eneivicys42bq5f2jpn2.jpg",
//   "secure_url": "https://res.cloudinary.com/demo/image/upload/v1473596672/eneivicys42bq5f2jpn2.jpg",
//   "original_filename": "sample",
//   "eager": [
//     {
//       "transformation": "c_pad,h_300,w_400",
//       "width": 400,
//       "height": 300,
//       "url": "https://res.cloudinary.com/demo/image/upload/c_pad,h_300,w_400/v1473596672/eneivicys42bq5f2jpn2.jpg",
//       "secure_url": "https://res.cloudinary.com/demo/image/upload/c_pad,h_300,w_400/v1473596672/eneivicys42bq5f2jpn2.jpg"
//     },
//     {
//       "transformation": "c_crop,g_north,h_200,w_260",
//       "width": 260,
//       "height": 200,
//       "url": "https://res.cloudinary.com/demo/image/upload/c_crop,g_north,h_200,w_260/v1473596672/eneivicys42bq5f2jpn2.jpg",
//       "secure_url": "https://res.cloudinary.com/demo/image/upload/c_crop,g_north,h_200,w_260/v1473596672/eneivicys42bq5f2jpn2.jpg"
//     }
//   ]
// }


module.exports.removeTempFile = removeTempFile;
