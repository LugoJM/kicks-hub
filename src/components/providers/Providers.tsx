"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

interface Props {
    children : React.ReactNode;
}

export const Providers = ( { children } : Props) => {

  return (
    <PayPalScriptProvider options={{ 
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
        intent : "capture",
        currency : "USD"
      }}>
      <SessionProvider>
          {children}
      </SessionProvider>
      <Toaster richColors position="bottom-center"/>
    </PayPalScriptProvider>
  )
};
