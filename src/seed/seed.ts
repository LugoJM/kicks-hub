import bcrypt from "bcryptjs";

interface SeedProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  title: string;
  type: ValidTypes;
  gender: "men" | "women" | "kid" | "unisex";
}

interface SeedUser{
  name : string;
  email : string;
  password : string;
  role : ValidRoles;
}

type ValidRoles = "user" | "admin";

type ValidSizes = "5"|"5.5"|"6"|"6.5"|"7"|"7.5"|"8"|"8.5"|"9"|"9.5"|"10"|"10.5"|"11"|"12"|"13";
type ValidTypes = "sneakers" | "slides" | "shirts" | "jacket";

interface SeedData {
  users : SeedUser[];
  categories : ValidTypes[];
  products: SeedProduct[];
}

export const initialData: SeedData = {
  users : [
    {
      name: "JM. Lugo",
      email: "jm_lugo@mail.com",
      password: bcrypt.hashSync("12345678"),
      role: "admin"
    },
    {
      name: "Test User",
      email: "test_user@mail.com",
      password: bcrypt.hashSync("12345678"),
      role: "user"
    }
  ],
  categories: ["sneakers", "slides", "shirts", "jacket"],
  products: [
    {
      description:
        "The Air Jordan 4 Retro ‘Bred Reimagined’ makes over the iconic silhouette with a black leather upper, replacing the nubuck material of the original 1989 release. Heritage details include quarter panel netting, grey molded eyelets, and Nike Air branding on the heel tab. Atop the tongue, a woven Flight tag displays a crimson Jumpman logo. The mid-top is mounted on a lightweight polyurethane midsole, fitted with encapsulated Air-sole cushioning in the forefoot and an exposed Air unit in the heel. Underneath, a pre-distressed rubber outsole features a herringbone traction pattern for superior grip.",
      images: [
        "1293064_01.webp",
        "1293064_03.webp",
        "1293064_04.webp",
        "1293064_06.webp",
        "1293064_08.webp",
      ],
      inStock: 10,
      price: 220,
      sizes: ["7", "7.5", "8", "9", "9.5", "11", "12"],
      slug: "air-jordan-4-retro-bred-reimagined",
      type: "sneakers",
      tags: ["Air Jordan", "Sneakers", "Air Jordan 4"],
      title: "Air Jordan 4 Retro 'Bred Reimagined'",
      gender: "men",
    },
    {
      description:
        "The Women’s Air Jordan 1 Low ‘White Wolf Grey’ brings neutral two-tone color blocking to a timeless silhouette modeled after the 1985 original. The all-leather upper combines a white foundation with light grey overlays and a color-matched Swoosh. A silver Jumpman is embroidered on the tongue, while a retro Wings logo is imprinted on the back heel. The sneaker rides on a white rubber midsole, enhanced with encapsulated Air-sole cushioning and supported by a translucent rubber outsole.",
      images: [
        "776547_01.webp",
        "776547_03.webp",
        "776547_04.webp",
        "776547_06.webp",
        "776547_08.webp",
      ],
      inStock: 30,
      price: 120,
      sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "9"],
      slug: "wmns-air-jordan-1-low-white-wolf-grey",
      type: "sneakers",
      tags: ["Air Jordan", "Sneakers", "Air Jordan 1"],
      title: "Womens Air Jordan 1 Low 'White Wolf Grey'",
      gender: "women",
    },
    {
      description:
        "The Women’s Air Jordan 1 Low ‘White Wolf Grey’ brings neutral two-tone color blocking to a timeless silhouette modeled after the 1985 original. The all-leather upper combines a white foundation with light grey overlays and a color-matched Swoosh. A silver Jumpman is embroidered on the tongue, while a retro Wings logo is imprinted on the back heel. The sneaker rides on a white rubber midsole, enhanced with encapsulated Air-sole cushioning and supported by a translucent rubber outsole.",
      images: [
        "1267812_01.webp",
        "1267812_03.webp",
        "1267812_04.webp",
        "1267812_06.webp",
        "1267812_08.webp",
      ],
      inStock: 30,
      price: 170,
      sizes: ["6", "6.5", "7", "7.5", "8", "9", "10", "10.5"],
      slug: "supreme-x-air-force-1-low-box-logo-baroque-brown",
      type: "sneakers",
      tags: ["Nike", "Sneakers", "Air force 1", "Supreme"],
      title: "Supreme x Air Force 1 Low 'Box Logo - Baroque Brown'",
      gender: "men",
    },
  ],
};