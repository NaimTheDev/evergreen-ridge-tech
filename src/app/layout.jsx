import RootLayout from "@/components/RootLayout";
import "./globals.css";

export const metadata = {
  title: {
    template: "Abdullah",
    default: "Abdullah",
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
