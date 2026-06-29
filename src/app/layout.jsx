import RootLayout from "@/components/RootLayout";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.evergreenridgetech.com"),
  title: {
    template: "%s | Evergreen Ridge Technology",
    default:
      "Evergreen Ridge Technology — Custom Software Development Agency",
  },
  description:
    "Evergreen Ridge Technology is a software development agency that designs and builds secure, scalable web, mobile, and cloud applications for growing businesses — from first idea to launch and beyond.",
  keywords: [
    "software development agency",
    "custom software development",
    "web application development",
    "mobile app development",
    "cloud applications",
    "React development",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.evergreenridgetech.com",
    siteName: "Evergreen Ridge Technology",
    title: "Evergreen Ridge Technology — Custom Software Development Agency",
    description:
      "We design and build secure, scalable web, mobile, and cloud applications for growing businesses — from first idea to launch and beyond.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evergreen Ridge Technology — Custom Software Development Agency",
    description:
      "Secure, scalable web, mobile, and cloud applications for growing businesses.",
  },
};

export default function Layout({ children }) {
  return (
    <html
      lang="en"
      className="h-full bg-background text-base antialiased text-foreground"
    >
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
