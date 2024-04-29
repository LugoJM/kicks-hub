"use server";

import { auth } from "@/auth.config";
import type { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

interface OrderProduct{
    productId : string;
    quantity : number;
    size : string;
}



export const placeOrder = async ( orderProducts: OrderProduct[], address : Address) => {
    const session = await auth();
    const userId = session?.user.id;

    if(!userId) {
        return {
            ok : false,
            message : "Couldn't find the user session."
        };
    }

    //Get products
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: orderProducts.map((product) => product.productId),
        },
      },
    });

    //Total orderItems
    const itemsInOrder = orderProducts.reduce((count, product) => count + product.quantity, 0);
    
    //Calculate subtotal, total & tax
    const { subTotal, tax, total } = orderProducts.reduce((totals, productItem) => {
        const productQuantity = productItem.quantity;
        const product = products.find(p => p.id === productItem.productId);

        if(!product) throw new Error(`${productItem.productId} don't exist.`);

        const subtotal = product.price * productQuantity;
        totals.subTotal += subtotal;
        totals.tax += subtotal * 0.15;
        totals.total += subtotal * 1.15;

        return totals
    },{subTotal : 0, total : 0, tax : 0})

    //Create transaction for database in case something fails it automatically rollsback all the changes.
    try {
      const prismaTransaction = await prisma.$transaction(async (tx) => {
        //Update products stock
        const updatedProductsStockPromises = products.map((product) => {
          //Sum or products by Id
          const productQuantity = orderProducts
            .filter((p) => p.productId === product.id)
            .reduce((value, item) => value + item.quantity, 0);

          if (productQuantity === 0)
            throw new Error(`${product.id} does not have a assigned quantity.`);

          return tx.product.update({
            where: { id: product.id },
            data: {
              inStock: {
                decrement: productQuantity,
              },
            },
          });
        });

        //"Updated Values"
        const updatedProducts = await Promise.all(updatedProductsStockPromises);
        //Verify is a product is out of stock = negative stock
        updatedProducts.forEach((product) => {
          if (product.inStock < 0) {
            throw new Error(`${product.title} is out of stock.`);
          }
        });

        //Create Order => OrderDetail
        const order = await tx.order.create({
          data: {
            userId,
            itemsInOrder,
            subTotal,
            tax,
            total,

            orderItems: {
              createMany: {
                data: orderProducts.map((p) => ({
                  quantity: p.quantity,
                  size: p.size,
                  productId: p.productId,
                  price:
                    products.find((product) => product.id === p.productId)
                      ?.price ?? 0,
                })),
              },
            },
          },
        });

        //Save OrderAddress
        const { country, ...restAddress } = address;
        //TODO: Spread operator fails due to data receiving a 'userId' property that does not exist...
        const orderAddress = await tx.orderAddress.create({
          data: {
            name: address.name,
            lastName: address.lastName,
            address: address.address,
            additionalAddress: address.additionalAddress,
            postalCode: address.postalCode,
            city: address.city,
            phone: address.phone,
            countryId: country,
            orderId: order.id,
          },
        });

        return {
          order: order,
          orderAddress: orderAddress,
          updatedProducts,
        };
      });

      return {
        ok : true,
        orderId : prismaTransaction.order.id
      };
    } catch (error:any) {
        return {
            ok : false,
            message: error?.message
        };
    }
};