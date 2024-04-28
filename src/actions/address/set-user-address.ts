"use server";

import type { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const savedUserAddress = createOrReplaceUserAddress(address, userId);

    return {
      ok: true,
      address: savedUserAddress,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Couldn't save address.",
    };
  }
};

const createOrReplaceUserAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const addressForDB = {
      userId: userId,
      name: address.name,
      lastName: address.lastName,
      address: address.address,
      additionalAddress: address.additionalAddress,
      city: address.city,
      postalCode: address.postalCode,
      countryId: address.country,
      phone: address.phone,
    };

    if (!storedAddress) {
      const newUserAddress = await prisma.userAddress.create({
        data: addressForDB,
      });

      return newUserAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId,
      },
      data: addressForDB,
    });

    return updatedAddress;
  } catch (error) {
    throw new Error("Server Error: Couldnt'save Address");
  }
};
