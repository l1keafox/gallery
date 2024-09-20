import Link from "next/link";
import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import { Button } from "@ui/Button";
import { tv } from "tailwind-variants";
import { StoryblokPalette } from "@/helpers/storyblok";

const StyledLinkStyles = tv(
  {
    slots: {
      buttonStyle: "whitespace-nowrap px-0 flex items-center justify-center",
    },
    variants: {
      font: {
        "font-grotesk": {
          buttonStyle: "font-grotesk",
        },
        "font-roboto": {
          buttonStyle: "font-roboto",
        },
        "font-noto": {
          buttonStyle: "font-noto",
        },
        "font-garamond": {
          buttonStyle: "font-garamond",
        },
        "font-crimson": {
          buttonStyle: "font-crimson",
        },
        "font-sans": {
          buttonStyle: "font-sans",
        },
      },
      screenPseudo: {
        md: {},
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

// Button Blok in storyblok.
import { StoryblokRounded, StoryblokFonts } from "@/helpers/storyblok";
export interface StyledLinkBlokData extends SbBlokData {
  text: string;
  url: string;
  size: "medium" | "large" | "xLarge";
  rounded: StoryblokRounded;
  font: StoryblokFonts;
  color: StoryblokPalette;
}

export interface StyledLinkProps {
  blok: StyledLinkBlokData;
}

export function StyledLink({ blok }: StyledLinkProps) {
  // if the blok.url is all numbers then add 'tel:' to the front of the url
  if (blok.url.match(/^\d+$/)) {
    blok.url = `tel:${blok.url}`;
  }
  // if the blok.url is an email address then add 'mailto:' to the front of the url
  if (blok.url.match(/@/)) {
    blok.url = `mailto:${blok.url}`;
  }

  const { size, color, font, rounded } = blok;
  const { buttonStyle } = StyledLinkStyles({
    font,
    screenPseudo: {
      md: "md",
      lg: "lg",
      xl: "xl",
      "2xl": "2xl",
    },
  });

  return (
    <Button
      className={buttonStyle()}
      size={size}
      color={color?.value}
      rounded={rounded}
      {...storyblokEditable(blok)}
      asChild
    >
      <Link href={blok.url ?? ""}>{blok.text}</Link>
    </Button>
  );
}
