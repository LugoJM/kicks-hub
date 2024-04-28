"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        password: bcrypt.hashSync(password),
        email: email.toLowerCase(),
      },
      select : {
        id : true,
        name : true,
        email : true,
      }
    });

    return {
        ok : true,
        user : user,
        message : "User Created Successfully"
    };

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Internal Server Error While Creating User",
    };
  }
};
