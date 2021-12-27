import Image from "next/image";

export default function ProductCardImage({ src }) {
  return <Image src={src} alt="Pan de Molde" layout="fill" />;
}
