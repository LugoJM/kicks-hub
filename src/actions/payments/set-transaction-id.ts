"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (id: string, transactionId: string) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id,
      },
      data: {
        transactionId,
      },
    });

    if (!updatedOrder) {
      return {
        ok: false,
        message: `${id} could not be found`,
      };
    }

    return { ok : true};
  } catch (error) {
    return {
      ok: false,
      message: "Error while saving the transaction ID",
    };
  }
};
