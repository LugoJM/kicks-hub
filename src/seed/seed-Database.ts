import { initialData } from "./seed";
import { countries } from "./seed-countries";
import prisma from '../lib/prisma';

async function main() {
    const { categories, products, users } = initialData;

    await Promise.all([
      prisma.userAddress.deleteMany(),
      prisma.country.deleteMany(),
      prisma.productImage.deleteMany(),
      prisma.product.deleteMany(),
      prisma.category.deleteMany(),
      prisma.user.deleteMany()
    ]);

    await prisma.user.createMany({
      data : users
    });

    await prisma.country.createMany({
      data : countries
    });

    const categoriesData = categories.map(category => ({
        name : category
    }));

    await prisma.category.createMany({
        data : categoriesData
    });

    const categoriesDatabase = await prisma.category.findMany();

    const categoriesMap = categoriesDatabase.reduce((map, category) => {
        map[category.name.toLocaleLowerCase()] = category.id;
        return map;
    }, {} as Record<string,string>)

    products.forEach( async(product) => {
        const { type, images, ...rest } = product;

    
        const dbProduct = await prisma.product.create({
          data: {
            ...rest,
            categoryId: categoriesMap[type]
          }
        });
    
        const imagesData = images.map( image => ({
          url: image,
          productId: dbProduct.id
        }));
    
        await prisma.productImage.createMany({
          data: imagesData
        });
      });
    


    console.log('Seed executed successfully')
}

(() => {
    if(process.env.NODE_ENV === "production") return;
    main();
})();