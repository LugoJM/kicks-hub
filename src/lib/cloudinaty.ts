import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64ImageString = Buffer.from(buffer).toString("base64");
        const mime_Type = image.type;
        console.log(mime_Type);
        return cloudinary.uploader
          .upload(`data:${mime_Type};base64,${base64ImageString}`)
          .then((r) => r.secure_url);
      } catch (error) {
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);

    return uploadedImages;
  } catch (error) {
    return null;
  }
};

export const deleteImage = async (imageName : string) => {
    await cloudinary.uploader.destroy(imageName);
}