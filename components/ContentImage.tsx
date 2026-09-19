import { mediaSrc } from "@/lib/blob";

type ContentImageProps = {
  src: string;
  alt?: string;
  className?: string;
};

export default function ContentImage({ src, alt = "", className }: ContentImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={mediaSrc(src)} alt={alt} className={className} />
  );
}
