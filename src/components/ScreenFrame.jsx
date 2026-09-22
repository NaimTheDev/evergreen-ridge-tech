import Image from "next/image";
import clsx from "clsx";

/*
  Rectangular sibling of PhoneFrame, for wide imagery — detail crops, desktop
  screens — where a phone bezel would be wrong.

  Deliberately has no hover scale: these frames hold text-dense crops, and
  scaling inside `overflow-hidden` shaves the outer rows and makes small type
  shimmer. The border and shadow carry the hover instead.
*/
const ScreenFrame = ({ image, alt, caption, className }) => {
  return (
    <figure className={clsx("group", className)}>
      <div className="lift rounded-3xl border border-border bg-card p-2 shadow-[0_20px_60px_rgba(15,61,46,0.12)] group-hover:border-accent/60 group-hover:shadow-[0_28px_70px_rgba(15,61,46,0.18)]">
        <div className="overflow-hidden rounded-2xl bg-background">
          <Image
            src={image}
            alt={alt}
            sizes="(min-width: 1024px) 44rem, 92vw"
            className="h-auto w-full"
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-4 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground motion-reduce:transition-none">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ScreenFrame;
