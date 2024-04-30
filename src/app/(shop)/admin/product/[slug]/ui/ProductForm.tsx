"use client";

import { deleteProductImage, updateProduct } from "@/actions";
import { ProductImage as ProductImageComponent } from "@/components";
import type { Category, Product, ProductImage } from "@/interfaces";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  product: Partial<Product> & { ProductImage? : ProductImage[]} ;
  categories : Category[];
}

const sizes = ["5","5.5","6","6.5","7","7.5","8","8.5","9","9.5","10","10.5","11","12","13"];

interface FormInputs {
  title : string;
  slug : string;
  description : string;
  price : number;
  inStock : number;
  sizes : string[];
  tags : string;
  gender : "men"|"women"|"kid"|"unisex";
  categoryId : string;
  images? : FileList;
};


export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      sizes: product.sizes ?? [],
      images:undefined,
    },
  });
  
  watch("sizes");

  const onSizeSelected = (size : string) => {
    const sizes = new Set(getValues("sizes"));

    sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    setValue("sizes", Array.from(sizes));
  };

  const onSubmit = async (data : FormInputs) => {
    const formData = new FormData();

    const {images, ...productToModify } = data;

    if(product.id ){
      formData.append("id", product.id ?? "");
    }
    formData.append("title", productToModify.title);
    formData.append("slug", productToModify.slug);
    formData.append("description", productToModify.description);
    formData.append("price", productToModify.price.toString());
    formData.append("inStock", productToModify.inStock.toString());
    formData.append("sizes", productToModify.sizes.toString());
    formData.append("gender", productToModify.gender);
    formData.append("tags", productToModify.tags);
    formData.append("categoryId", productToModify.categoryId);

    if(images){
      for(let i = 0; i < images.length; i++){
        formData.append("images", images[i]);
      };
    }

    const {ok, newProduct, message} = await updateProduct(formData);
    if(!ok){
      alert(message);
      return;
    }

    router.replace(`/admin/product/${newProduct?.slug}`);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register("title", {required : true})} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register("slug", {required : true})} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200" {...register("description", {required : true})}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" {...register("price", {required : true, min : 0})} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register("tags", {required : true})} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select className="p-2 border rounded-md bg-gray-200" {...register("gender", {required : true})}>
            <option value="">[Select]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select className="p-2 border rounded-md bg-gray-200" {...register("categoryId", {required : true})}>
            <option value="">[Select]</option>
            {
              categories.map(category => (
                <option key={category.id} value={category.id} className="capitalize">{category.name}</option>
              ))
            }
          </select>
        </div>

        <button type="submit" className="btn-primary w-full">
          Save
        </button>
      </div>

      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>In-Stock</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" {...register("inStock", {required : true, min : 1})} />
        </div>
        <div className="flex flex-col">
          <span>Sizes</span>
          <div className="flex flex-wrap">
            {
              sizes.map( size => (
                <div 
                  key={ size } 
                  onClick={() => onSizeSelected(size)}
                  className={clsx(
                    "flex items-center justify-center w-10 h-10 mr-2 border rounded-md cursor-pointer",
                    {
                      "bg-blue-500 text-white" : getValues("sizes").includes(size)
                    }
                  )}>
                    <span>{ size }</span>
                </div>
              ))
            }

          </div>

          <div className="flex flex-col mb-2">
            <span>Pictures</span>
            <input 
              type="file"
              {...register("images")}
              multiple 
              className="p-2 border rounded-md bg-gray-200" 
              accept="image/png, image/jpeg, image/webp"
            />

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {
              product.ProductImage?.map(image => (
                <div key={image.id}>
                  <ProductImageComponent src={image?.url} width={300} height={300} alt={product.title ?? ""} className="rounded-t shadow-md w-full h-52 object-fill" />
                  <button 
                    onClick={async () => await deleteProductImage(image.id, image.url)}
                    type="button" 
                    className="btn-danger rounded-b-xl w-full">
                      Delete
                  </button>
                </div>
              ))
            }
          </div>

        </div>
      </div>
    </form>
  );
};