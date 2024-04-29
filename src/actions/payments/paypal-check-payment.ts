"use server";

import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPayPalBearer();

  if (!authToken) {
    return {
      ok: false,
      message: "Error while generating oAuth token",
    };
  }

  const res = await verifyPayPalPayment(authToken, paypalTransactionId);

  if (!res) {
    return {
      ok: false,
      message: "Error while verifying the payment",
    };
  }

  const { status, purchase_units } = res;

  if (status !== "COMPLETED") {
    return {
      ok: "false",
      message: "Paypal purchase not finished",
    };
  }

  const { invoice_id: orderId } = purchase_units[0];

  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    //Revalidate path
    revalidatePath(`/orders/${orderId}`);

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: "The payment was not successful",
    };
  }
};

const getPayPalBearer = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2Url, {
      ...requestOptions,
      cache: "no-store",
    }).then((res) => res.json());

    return result.access_token;
  } catch (error) {
    return null;
  }
};

const verifyPayPalPayment = async (
  bearerToken: string,
  paypalTransactionId: string
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrderURL = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    return await fetch(paypalOrderURL, {
      ...requestOptions,
      cache: "no-store",
    }).then((res) => res.json());
  } catch (error) {
    return null;
  }
};
