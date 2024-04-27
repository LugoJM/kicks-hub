export const revalidate = 60;

import { getPaginatedProductWithImages } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams : {
    page : string;
  }
}

export default async function Home( { searchParams } : Props) {
  const page = searchParams.page ? +searchParams.page : 1;
  
  const { products, totalPages } = await getPaginatedProductWithImages({page});

  if(products.length == 0) redirect("/");

  return (
    <>
      <Title title="Shop" subtitle="All products" className="mb-2" />
      <ProductsGrid products={products}/>

      <Pagination totalPages={totalPages} />
    </>
  );
}
