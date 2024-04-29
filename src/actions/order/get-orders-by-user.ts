"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getUserOrders = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "You must be authenticated.",
    };
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      orderAddress: {
        select: {
          name: true,
          lastName: true,
        },
      },
    },
  });

  return {
    ok: true,
    orders,
  };
};
