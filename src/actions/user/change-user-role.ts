"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {
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
    const newRole = role === "admin" ? "admin" : "user";
    await prisma.user.update({
        where : {
            id : userId
        },
        data : {
            role : newRole
        }
    });
    
    revalidatePath("/admin/users");
    
    return {
        ok : true,
    };
  } catch (error) {
    return {
        ok : false,
        message : "Error while updating role"
    };
  };
};
