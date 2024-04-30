import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
  width: number;
  height: number;
  onMouseEnter? : () => void;
  onMouseLeave? : () => void;
}

export const ProductImage = ({ src, alt, className, width, height, onMouseEnter, onMouseLeave, style }: Props) => {
  const newSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/images/placeholder-image.webp";

  return (
    <Image
      src={newSrc}
      className={className}
      alt={alt}
      width={width}
      height={height}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    />
  );
};
