"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderDetails = async (id: string) => {
  const session = await auth();

  if (!session) {
    return {
      ok: false,
      message: "Must be authenticated.",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderAddress: true,
        orderItems: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw `${id} doesnt exist.`;

    if(session.user.role === "user"){
        if(session.user.id !== order.userId){
            throw `${id} is not from the user.`;
        }
    }

    return {
      ok: true,
      order,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Order not found.",
    };
  }
};
