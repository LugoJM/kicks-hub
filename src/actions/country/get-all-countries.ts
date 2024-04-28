"use server";

import prisma from "@/lib/prisma";

export const getAllCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return countries;
  } catch (error) {
    return [];
  }
};
