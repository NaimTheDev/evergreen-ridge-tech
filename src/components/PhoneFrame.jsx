import Image from "next/image";
import clsx from "clsx";

/*
  `sm` reproduces the original hard-coded values exactly, so pages that don't
  pass a size render identically to before this prop existed.
*/
const variants = {
  sm: {
    frame: "max-w-[16rem]",
    caption: "max-w-[18rem]",
    sizes: "(min-width: 1024px) 16rem, (min-width: 640px) 40vw, 70vw",
  },
  lg: {
    frame: "max-w-[20rem]",
    caption: "max-w-[22rem]",
    sizes: "(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 80vw",
  },
};

const PhoneFrame = ({
  image,
  alt,
  caption,
  className,
  priority = false,
  size = "sm",
}) => {
  const variant = variants[size] ?? variants.sm;

  return (
    <figure className={clsx("group flex flex-col items-center", className)}>
      <div
        className={clsx(
          "lift w-full rounded-[2.5rem] border border-border bg-card p-2 shadow-[0_20px_60px_rgba(15,61,46,0.12)] group-hover:border-accent/60 group-hover:shadow-[0_28px_70px_rgba(15,61,46,0.18)]",
          variant.frame
        )}
      >
        <div className="overflow-hidden rounded-[2rem] bg-background">
          <Image
            src={image}
            alt={alt}
            sizes={variant.sizes}
            className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
            priority={priority}
          />
        </div>
      </div>
      {caption && (
        <figcaption
          className={clsx(
            "mt-4 text-center text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground motion-reduce:transition-none",
            variant.caption
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default PhoneFrame;
