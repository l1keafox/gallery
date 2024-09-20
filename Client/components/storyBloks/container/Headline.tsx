import { tv } from "tailwind-variants";
import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import {
  StoryblokTextSize,
  StoryblokFonts,
  StoryblokJustify,
} from "@/helpers/storyblok";

const HeadlineStyles = tv(
  {
    slots: {
      root: "flex items-center px-0",
    },
    variants: {
      bold: {
        true: {
          root: "font-bold",
        },
      },
      //"start" | "end" | "center" | "between" | "around" | "evenly";
      justify: {
        start: {
          root: "justify-start",
        },
        end: {
          root: "justify-end",
        },
        center: {
          root: "justify-center",
        },
        right: {
          root: "justify-end",
        },
        between: {
          root: "justify-between",
        },
        around: {
          root: "justify-around",
        },
        evenly: {
          root: "justify-evenly",
        },
      },
      size: {
        "text-6xl": {
          root: "text-3xl md:text-6xl",
        },
        "text-5xl": {
          root: "text-lg md:text-5xl",
        },
        "text-4xl": {
          root: "text-lg md:text-4xl",
        },
        "text-3xl": {
          root: "text-lg md:text-3xl",
        },
        "text-2xl": {
          root: "text-lg md:text-2xl",
        },
        "text-xl": {
          root: "text-xl",
        },
        "text-lg": {
          root: "text-lg",
        },
        "text-md": {
          root: "text-md",
        },
      },
      font: {
        "font-grotesk": { root: "font-grotesk" },
        "font-roboto": { root: "font-roboto" },
        "font-noto": { root: "font-noto" },
        "font-garamond": { root: "font-garamond" },
        "font-crimson": { root: "font-crimson" },
        "font-sans": { root: "font-sans" },
      },
      screenPseudo: {
        md: {
          root: "px-6",
        },
        lg: {
          root: "px-6",
        },
        xl: {},
        "2xl": {},
      },
    },
  },
  {
    responsiveVariants: ["md", "lg", "xl", "2xl"],
  },
);

interface HeadlineBlokdata extends SbBlokData {
  headline: string;
  bold?: boolean;
  size?: StoryblokTextSize;
  font?: StoryblokFonts;
  justify?: StoryblokJustify;
}

export interface HeadlineProps {
  blok: HeadlineBlokdata;
}

export function Headline({ blok }: HeadlineProps) {
  const { headline, font, size, bold, justify } = blok;
  const { root } = HeadlineStyles({
    font,
    size,
    bold,
    justify,
    screenPseudo: {
      md: "md",
      lg: "lg",
      xl: "xl",
      "2xl": "2xl",
    },
  });
  return (
    <h2 className={root()} {...storyblokEditable(blok)}>
      {headline}
    </h2>
  );
}
