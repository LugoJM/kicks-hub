"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedOrders = async ({
  page = 1,
  take = 10,
}: PaginationOptions) => {
  page = isNaN(+page) || page < 1 ? 1 : +page;
  take = isNaN(+take) || take < 1 ? 1 : +take;

  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "You must be authenticated",
    };
  }

  const isAdmin = session.user.role === "admin";
  const userId = session.user.id;

  try {
    const [orders, ordersCount] = await Promise.all([
      prisma.order.findMany({
        take: take,
        skip: (page - 1) * take,
        orderBy :{
          createdAt : "desc"
        },
        where : isAdmin ? undefined : { userId },
        include: {
          orderAddress: {
            select: {
              name: true,
              lastName: true,
            },
          },
        },
      }),
      prisma.order.count(),
    ]);
    const totalPages = Math.ceil(ordersCount / take);

    return {
      ok: true,
      currentPage: page,
      totalPages,
      orders,
    };
  } catch (error) {
    throw new Error("Couldn't load orders");
  }
};
