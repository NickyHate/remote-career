import type { Metadata } from "next";
import { Literata, Manrope } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

const heading = Literata({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "На земле — удалёнка для бортпроводника с ребёнком",
  description:
    "Подборка удалённой работы и профессий для бортпроводника «Северсталь Авиа» с ребёнком 3,5 лет и плавающим графиком.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${sans.variable} ${heading.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
