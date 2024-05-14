export const revalidate = 60;

import { getPaginatedProductWithImages } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";


interface Props {
  params : {
    gender : string;
  },
  searchParams : {
    page? : string;
  }
};

const label : Record<string, string> = {
  men: "Man's",
  women: "Women's",
  kid: "Kid's",
  unisex : "Unisex"
};

export async function generateMetadata({ params } : Props) : Promise<Metadata>{
  return {
    title : label[params.gender]
  }
}

export default async function CategoryPage( {params, searchParams} : Props) {
  const page = searchParams.page ? +searchParams.page : 1;

  const { gender } = params;

  const { products, totalPages } = await getPaginatedProductWithImages({page, gender : gender as Gender});

  if(products.length === 0) notFound();

  return (
    <>
      <Title title={`${label[gender]} Products`} subtitle="All products" className="mb-2" />
      <ProductsGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}