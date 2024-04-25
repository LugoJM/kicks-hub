import { ProductsGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";


interface Props {
  params : {
    id : Category;
  }
};

const products = initialData.products;


export default function CategoryPage( {params} : Props) {
  const { id } = params;

  const categoryProducts =  products.filter(product => product.gender === id);

  const label : Record<Category, string> = {
    men: "Mans",
    women: "Womens",
    kid: "Kids",
    unisex : "Unisex"
  };
  
  // if(id === 'kids'){
  //   notFound();
  // }

  return (
    <div>
      <Title title={`${label[id]} Products`} subtitle="All products" className="mb-2" />
      <ProductsGrid products={categoryProducts} />
    </div>
  );
}