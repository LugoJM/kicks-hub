import { getProductBySlug, getCategories } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";


interface Props {
  params : {
    slug : string;
  }
}

export default async function AdminProductPage( { params } : Props) {
  const { slug } = params;

  const [product, {categories = []}] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ]);

  if(!product  && slug !== "new") redirect("/admin/products");

  const displayTitle = (slug === "new") ? "New Product" : "Edit Product";

  return (
    <>
      <Title title={displayTitle} />
      <ProductForm product={product ?? {}} categories={categories}  />
    </>
  );
}