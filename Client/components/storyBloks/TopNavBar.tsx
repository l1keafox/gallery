import { StoryblokAsset } from "@/helpers/storyblok";
import { StoryImage } from "../StoryImage";
import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";
import { tv } from "tailwind-variants";
import Link from "next/link";
import {
  StoryblokPalette,
  StoryblokFonts,
  StoryblokSizes,
} from "@/helpers/storyblok";

export interface TopNavBarBlokData extends SbBlokData {
  pageName: string;
  pageNameFont: StoryblokFonts;
  pageNameColor: StoryblokPalette;
  navBarSize: StoryblokSizes;
  image: StoryblokAsset;
  navigations: {
    text: string;
    link: string;
  }[];
}

export interface TopNavBarProps {
  blok: TopNavBarBlokData;
}

const TopNavBarStyles = tv(
  {
    slots: {
      root: "fixed top-0 h-16 flex w-full flex-row justify-between bg-white order-1 z-10 text-3xl",
      text: "",
    },
    variants: {
      pageNameFont: {
        "font-grotesk": { text: "font-grotesk" },
        "font-roboto": { text: "font-roboto" },
        "font-noto": { text: "font-noto" },
        "font-garamond": { text: "font-garamond" },
        "font-crimson": { text: "font-crimson" },
        "font-sans": { text: "font-sans" },
      },
      fontColor: {
        // ["#FFFFE0","#FFD700","#FFA07A","#FF4500", "#90EE90","#006400","#9370DB","#4B0082","#0D47A1","#1E90FF","#E12727","#B61D22","#FFF","#D1D3D4","#808285","#414042","#000"]

        "#FFFFE0": { text: "text-[#FFFFE0] hover:text-[#FFFF00]" },
        "#FFD700": { text: "text-[#FFD700] hover:text-[#FFFFE0]" },
        "#FFA07A": { text: "text-[#FFA07A] hover:text-[#FF7F50]" },
        "#FF4500": { text: "text-[#FF4500] hover:text-[#992900]" },
        "#90EE90": { text: "text-[#90EE90] hover:text-[#32CD32]" },
        "#006400": { text: "text-[#006400] hover:text-[#009000]" },
        "#9370DB": { text: "text-[#9370DB] hover:text-[#7B68EE]" },
        "#4B0082": { text: "text-[#4B0082] hover:text-[#6A5ACD]" },
        "#0D47A1": { text: "text-[#0D47A1] hover:text-[#1565C0]" },
        "#1E90FF": { text: "text-[#1E90FF] hover:text-[#187bcd]" },
        "#E12727": { text: "text-[#E12727] hover:text-[#B21F1F]" },
        "#B61D22": { text: "text-[#B61D22] hover:text-[#C74E4A]" },
        "#FFF": { text: "text-[#FFF] hover:text-[#000]" },
        "#D1D3D4": { text: "text-[#D1D3D4] hover:text-[#808285]" },
        "#808285": { text: "text-[#808285] hover:text-[#414042]" },
        "#414042": { text: "text-[#414042] hover:text-[#D1D3D4]" },
        "#000": { text: "text-[#000] hover:text-[#FFF]" },
      },
      height: {
        1: { root: "h-1" },
        2: { root: "h-2" },
        3: { root: "h-3" },
        4: { root: "h-4" },
        6: { root: "h-6" },
        8: { root: "h-8" },
        10: { root: "h-10" },
        14: { root: "h-14" },
        16: { root: "h-16" },
        20: { root: "h-20" },
        24: { root: "h-24" },
        28: { root: "h-28" },
        32: { root: "h-32" },
        36: { root: "h-36" },
        40: { root: "h-40" },
        44: { root: "h-44" },
        48: { root: "h-48" },
        52: { root: "h-52" },
        56: { root: "h-56" },
        60: { root: "h-60" },
        64: { root: "h-64" },
        68: { root: "h-68" },
        72: { root: "h-72" },
        76: { root: "h-76" },
        80: { root: "h-80" },
        88: { root: "h-88" },
        96: { root: "h-96" },
      },
      screenPseudo: {
        md: {
          root: "text-lg",
        },
        lg: {},
        xl: {},
        "2xl": {},
      },
    },
  },
  {
    responsiveVariants: ["md", "lg", "xl", "2xl"],
  },
);

export function TopNavBar({ blok }: TopNavBarProps) {
  const { pageNameFont, pageNameColor, navBarSize } = blok;
  const { root, text } = TopNavBarStyles({
    screenPseudo: {
      md: "md",
      lg: "lg",
      xl: "xl",
      "2xl": "2xl",
    },
    pageNameFont,
    fontColor: pageNameColor?.value,
    height: navBarSize?.value,
  });
  return (
    <nav className={root()} {...storyblokEditable(blok)}>
      <div className="relative inset-0 bg-gray-1 w-full">
        {blok.image?.filename && (
          <StoryImage
            src={blok.image}
            alt="topImage"
            fill
            className="object-cover absolute top-0 left-0"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-white from-1% to-transparent to-99%" />
        <div className="absolute inset-0 flex items-center text-lg md:text-2xl">
          <Link
            href="/"
            className={text({ className: "ml-2 md:ml-4 lg:ml-8 font-black" })}
          >
            {blok.pageName}
          </Link>
        </div>
        <div className="gap-8 absolute right-20 top-1/2 -translate-y-1/2 hidden md:flex">
          {blok?.navigations?.map((nav, i) => (
            <a
              key={i}
              href={nav.link}
              className={text({ className: "font-black text-lg md:text-2xl" })}
            >
              {nav.text}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
