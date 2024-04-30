"use server";

import { uploadtoS3 } from "@/lib";
import prisma from "@/lib/prisma";
import { Gender, Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from "zod";

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(1)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  gender: z.string(),
  tags: z.coerce.string().transform((val) => val.split(",")),
});

export const updateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.log(productParsed.error);
    return {
      ok: false,
    };
  }
  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();
  product.tags.map((tag) => tag.trim().toLocaleLowerCase());

  const { id, ...rest } = product;

  try {
    const prismaTransaction = await prisma.$transaction(async (tx) => {
      //If the id exists : Update Product.
      //else : Create Product.
      let product: Product;
      if (id) {
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            gender: rest.gender as Gender,
          },
        });
      } else {
        product = await prisma.product.create({
          data: {
            ...rest,
            gender: rest.gender as Gender,
          },
        });
      }

      //Save images
      if (formData.getAll("images")) {
        const images = await uploadImages(formData.getAll("images") as File[]);
        if (!images) {
          throw new Error("Could not upload images to S3");
        }

        await prisma.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        });
      }

      return {
        product,
      };
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath("/");

    return {
      ok: true,
      newProduct: prismaTransaction.product,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error while updating/creating product",
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        return uploadtoS3(image);
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

