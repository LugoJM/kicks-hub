export const revalidate = 604800;

import type { Metadata, ResolvingMetadata } from "next";
import { getProductBySlug } from "@/actions";
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { AddToCartSelectors } from "./ui/AddToCartSelectors";


interface Props {
  params : {
    slug : string;
  }
}

export async function generateMetadata(
  { params } : Props,
  parent : ResolvingMetadata
) : Promise<Metadata>{
  const { slug } = params;

  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? "Product Not Found",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Product Not Found",
      description: product?.description ?? "",
      images : [`/products/${product?.images[0]}`]
    },
  };
};

export default async function ProductPage( { params } : Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if(!product) notFound();

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        <ProductMobileSlideshow className="block md:hidden" images={product.images} title={product.title} />
        <ProductSlideshow className="hidden md:block" images={product.images} title={product.title} />
      </div>

      <div className="px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
        <StockLabel slug={product.slug} className="mb-2" />
        <p className="text-lg mb-5">${product.price.toFixed(2)}</p>

        <AddToCartSelectors product={product} />

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}