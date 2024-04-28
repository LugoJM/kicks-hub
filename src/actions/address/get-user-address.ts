import prisma from "@/lib/prisma";

export const getStoredUserAddress = async (userId: string) => {
  try {
    const storedUserAddress = await prisma.userAddress.findFirst({
      where: {
        userId,
      },
    });

    if (!storedUserAddress) return null;

    const { countryId, additionalAddress, ...rest } = storedUserAddress;

    return {
      ...rest,
      additionalAddress : additionalAddress ? additionalAddress : "",
      country: countryId,
    };
  } catch (error) {
    return null;
  }
};
