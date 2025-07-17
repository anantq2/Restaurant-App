import { v2 as cloudinary } from "cloudinary";

const uploadImageOnCloudinary = async (file: Express.Multer.File) => {
  if (!file) {
    throw new Error("No file provided");
  }

  const base64Image = file.buffer.toString("base64");
  const dataURI = `data:${file.mimetype};base64,${base64Image}`;

  try {
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: "your-folder-name", // optional: change or remove
    });

    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
};

export default uploadImageOnCloudinary;
