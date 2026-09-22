import Image from "next/image";
import clsx from "clsx";

const PhoneFrame = ({ image, alt, caption, className, priority = false }) => {
  return (
    <figure className={clsx("group flex flex-col items-center", className)}>
      <div className="lift w-full max-w-[16rem] rounded-[2.5rem] border border-border bg-card p-2 shadow-[0_20px_60px_rgba(15,61,46,0.12)] group-hover:border-accent/60 group-hover:shadow-[0_28px_70px_rgba(15,61,46,0.18)]">
        <div className="overflow-hidden rounded-[2rem] bg-background">
          <Image
            src={image}
            alt={alt}
            sizes="(min-width: 1024px) 16rem, (min-width: 640px) 40vw, 70vw"
            className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
            priority={priority}
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-4 max-w-[18rem] text-center text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground motion-reduce:transition-none">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default PhoneFrame;
