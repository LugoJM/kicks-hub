"use server";

import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string) => {
  try {
    const stock = await prisma.product.findFirst({
      where: {
        slug,
      },
      select: {
        inStock: true,
      },
    });
    return stock?.inStock;
  } catch (error) {
    return 0;
  }
};
