import Image from "next/image";
import { titleFont } from "@/config/fonts";
import { Title } from "@/components";

export default function Home() {
  return (
    <div>
      <Title title="Shop" subtitle="All products" className="mb-2" />
    </div>
  );
}
