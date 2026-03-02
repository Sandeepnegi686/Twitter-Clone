import cloudinary from "../config/cloudinary";
import { UploadApiResponse } from "cloudinary";

// function uploadMediaToCloudinary(
//   file: Express.Multer.File,
// ): Promise<UploadApiResponse> {
//   return new Promise((res, rej) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       { resource_type: "auto" },
//       (err, result) => {
//         if (err) {
//           console.error(err.message);
//           rej(err);
//         }
//         if (!result) {
//           console.error("Upload failed");
//           return rej(new Error("Upload failed"));
//         }
//         console.log("image uploaded");
//         res(result);
//       },
//     );
//     uploadStream.end(file.buffer);
//   });
// }

import streamifier from "streamifier";

const uploadMediaToCloudinary = (file: Express.Multer.File, folder: string) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
        console.log("upload successful");
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

async function deleteMediaFromCloudinary(publicId: string) {
  const result = await cloudinary.uploader.destroy(publicId);
  console.log(
    "media deleted successfully from cloud storage. Public : ID",
    publicId,
  );
  return result;
}

export { uploadMediaToCloudinary, deleteMediaFromCloudinary };
