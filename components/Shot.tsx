import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** CSS aspect-ratio for the frame, e.g. "21/9" or "4/5" */
  ratio: string;
  /** caption left, caption right */
  caption?: [string, string];
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * One image slot: the framed photograph plus its Fig. caption.
 * `.shot` is position:relative in globals.css, which is what next/image fill needs.
 */
export default function Shot({ src, alt, ratio, caption, sizes = "100vw", priority, className = "" }: Props) {
  return (
    <>
      <div className={`shot ph ${className}`} style={{ aspectRatio: ratio }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
      </div>
      {caption && (
        <div className="cap">
          <span>{caption[0]}</span>
          <span>{caption[1]}</span>
        </div>
      )}
    </>
  );
}
