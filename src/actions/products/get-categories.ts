"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getCategories = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "You must be authenticated",
    };
  }

  const isAdmin = session.user.role === "admin";

  if (!isAdmin) {
    return {
      ok: false,
      message: "Authorization error",
    };
  }

  try {
    const categories = await prisma.category.findMany();

    return {
      ok: true,
      categories,
    };
  } catch (error) {
    return {
      ok: "false",
      message: "Error while retrieving product categories",
    };
  }
};
