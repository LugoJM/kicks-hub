"use server";

import { deleteFileFromS3 } from "@/lib";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProductImage = async (imageId: number, imageURL: string) => {
  if (!imageURL.startsWith("http")) {
    return {
      ok: false,
      message: "Can not delete files from file system",
    };
  }

  const parsedUrl = new URL(imageURL);

  const path = parsedUrl.pathname;

  const fileKey = path.substring(1);

  try {
    await deleteFileFromS3(fileKey);

    const deleteImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    revalidatePath("/admin/products/")
    revalidatePath(`/admin/product/${deleteImage.product.slug}`);
    revalidatePath(`/product/${deleteImage.product.slug}`);
    revalidatePath("/");

  } catch (error) {
    return {
      ok: false,
      message: "Error while deleting image",
    };
  }
};
