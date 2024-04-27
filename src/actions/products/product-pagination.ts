"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page? : number;
  take? : number;
  gender? : Gender;
}

export const getPaginatedProductWithImages = async ({
  page = 1,
  take = 1,
  gender
}: PaginationOptions) => {
  
  page = isNaN(+page) || page < 1 ? 1 : +page;
  take = isNaN(+take) || take < 1 ? 1 : +take;

  try {
    const [products, productsCount] = await Promise.all([
      prisma.product.findMany({
        take: take,
        skip: (page - 1) * take,
        include: {
          ProductImage: {
            take: 2,
            select: {
              url: true,
            },
          },
        },
        where: {
          gender : gender
        }
      }),
      prisma.product.count({
        where : {
          gender : gender
        }
      }),
    ]);
    const totalPages = Math.ceil(productsCount / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("Couldn't load products");
  }
};