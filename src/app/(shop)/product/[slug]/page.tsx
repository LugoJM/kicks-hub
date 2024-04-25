import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";


interface Props {
  params : {
    slug : string;
  }
}

export default function ProductPage( { params } : Props) {
  const { slug } = params;

  const product = initialData.products.find(product => product.slug === slug);
  if(!product) notFound();
  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        <ProductMobileSlideshow className="block md:hidden" images={product.images} title={product.title} />
        <ProductSlideshow className="hidden md:block" images={product.images} title={product.title} />
      </div>

      <div className="px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
        <p className="text-lg mb-5">${product.price.toFixed(2)}</p>

        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />
        <QuantitySelector quantity={1} />

        <button className="btn-primary py-2 my-5">Add to cart</button>

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}