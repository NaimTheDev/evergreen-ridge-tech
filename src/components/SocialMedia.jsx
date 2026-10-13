import Link from "next/link";
import clsx from "clsx";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { gitHubUrl, linkedInUrl } from "@/config/site";

export const SocialMediaProfiles = [
  { title: "LinkedIn", href: linkedInUrl, icon: BsLinkedin },
  { title: "GitHub", href: gitHubUrl, icon: BsGithub },
];

const SocialMedia = ({ className, invert = false }) => {
  return (
    <ul
      role="list"
      className={clsx(
        "flex gap-x-10",
        invert ? "text-white" : "text-neutral-950",
        className
      )}
    >
      {SocialMediaProfiles.map((item) => (
        <li key={item.title}>
          <Link
            href={item.href}
            aria-label={item.title}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "transition",
              invert ? "hover:text-neutral-200" : "hover:text-neutral-700"
            )}
          >
            <item.icon className="h-6 w-6 fill-current" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialMedia;
