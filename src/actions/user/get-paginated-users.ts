"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedUsers = async ({ page = 1, take = 10 }: PaginationOptions) => {
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
    const [users, userCount] = await Promise.all([
      prisma.user.findMany({
        take,
        skip: (page - 1) * take,
        orderBy : {
          name : "desc"
        }
      }),
      prisma.user.count(),
    ]);

    const totalPages = Math.ceil(userCount / take);

    return {
      ok: true,
      totalPages,
      users,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error while retrieving users",
    };
  }
};
