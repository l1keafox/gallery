import { StoryImage } from "../StoryImage";
import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import { tv } from "tailwind-variants";
import { RichTextBlokData, RenderRichText } from "./Text";
import { Entertainer } from "@ui/Entertainer";
import {
  StoryblokRounded,
  StoryblokAsset,
  StoryblokFonts,
} from "@/helpers/storyblok";

interface HalfImageTextBlokData extends SbBlokData {
  image: StoryblokAsset;
  text: RichTextBlokData;
  rightAlign: boolean;
  imageRounded: StoryblokRounded;
  font: StoryblokFonts;
}

export interface HalfImageTextProps {
  blok: HalfImageTextBlokData;
}

const HalfImageTextStyles = tv(
  {
    slots: {
      root: "flex w-full items-center flex-col mb-4 md:mb-8 lg:mb-16",
      text: "py-8 px-2 whitespace-pre-wrap text-black",
      image: "shadow-lg",
    },
    variants: {
      font: {
        "font-grotesk": {
          text: "font-grotesk",
        },
        "font-roboto": {
          text: "font-roboto",
        },
        "font-noto": {
          text: "font-noto",
        },
        "font-garamond": {
          text: "font-garamond",
        },
        "font-crimson": {
          text: "font-crimson",
        },
        "font-sans": {
          text: "font-sans",
        },
      },
      imageRounded: {
        none: {
          image: "rounded-none",
        },
        small: {
          image: "rounded-sm",
        },
        medium: {
          image: "rounded-md",
        },
        large: {
          image: "rounded-lg",
        },
        xlarge: {
          image: "rounded-xl",
        },
        "2xlarge": {
          image: "rounded-2xl",
        },
        "3xlarge": {
          image: "rounded-3xl",
        },
        full: {
          image: "rounded-full",
        },
      },
      screenPseudo: {
        md: {
          text: "px-6",
        },
        lg: {},
        xl: {},
        "2xl": {},
      },
      rightAlign: {
        true: {
          root: "lg:flex-row-reverse",
          text: "text-right max-lg:text-center",
        },
        false: {
          root: "lg:flex-row max-lg:text-center",
        },
      },
    },
  },
  {
    responsiveVariants: ["md", "lg", "xl", "2xl"], // `true` to apply to all screen sizes
  },
);

export function HalfImageText({ blok }: HalfImageTextProps) {
  const { imageRounded, font } = blok;
  const { root, text, image } = HalfImageTextStyles({
    rightAlign: blok.rightAlign,
    imageRounded,
    font,
    screenPseudo: {
      md: "md",
      lg: "lg",
      xl: "xl",
      "2xl": "2xl",
    },
  });
  return (
    <Entertainer className={root()} {...storyblokEditable(blok)}>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full md:w-96">
          {blok.image && (
            <StoryImage
              src={blok.image}
              alt={blok.image.alt ?? "Test"}
              height={1800}
              width={1800}
              className={image()}
            />
          )}
        </div>
      </div>
      <div className="flex items-center justify-center lg:w-1/2 text-left">
        <RenderRichText className={text()} text={blok.text} />
      </div>
    </Entertainer>
  );
}
