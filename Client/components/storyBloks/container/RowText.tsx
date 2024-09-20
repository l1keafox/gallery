import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";
import { tv } from "tailwind-variants";
import { RenderRichText } from "../Text";
import { RichTextBlokData } from "../Text";
import { StoryblokFonts, StoryblokScale } from "@/helpers/storyblok";

interface TextBlokData extends SbBlokData {
  text: RichTextBlokData;
  width: StoryblokScale;
  textJustify: "left" | "center" | "right";
  font: StoryblokFonts;
}

export interface RowTextProps {
  blok: TextBlokData;
  phonePadding?: boolean;
}

const TextStyles = tv(
  {
    slots: {
      root: "",
    },
    variants: {
      font: {
        "font-grotesk": {
          root: "font-grotesk",
        },
        "font-roboto": {
          root: "font-roboto",
        },
        "font-noto": {
          root: "font-noto",
        },
        "font-garamond": {
          root: "font-garamond",
        },
        "font-crimson": {
          root: "font-crimson",
        },
        "font-sans": {
          root: "font-sans",
        },
      },
      textJustify: {
        left: {
          root: "text-left",
        },
        center: {
          root: "text-center",
        },
        right: {
          root: "text-right",
        },
      },
      phonePadding: {
        false: { root: "px-4 md:px-6" },
      },
      width: {
        3: { root: "w-full md:w-3/12" },
        4: { root: "w-full md:w-4/12" },
        5: { root: "w-full md:w-5/12" },
        6: { root: "w-full md:w-6/12" },
        7: { root: "w-full md:w-7/12" },
        8: { root: "w-full md:w-8/12" },
        9: { root: "w-full md:w-9/12" },
        10: { root: "w-10/12" },
        11: { root: "w-11/12" },
        12: { root: "w-12/12" },
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

export function RowText({ blok, phonePadding }: RowTextProps) {
  const { root } = TextStyles({
    width: blok.width,
    phonePadding,
    textJustify: blok.textJustify,
    font: blok.font,
    screenPseudo: {
      md: "md",
      lg: "lg",
      xl: "xl",
      "2xl": "2xl",
    },
  });

  return (
    <div className={root()} {...storyblokEditable(blok)}>
      <RenderRichText className="" text={blok.text} />
    </div>
  );
}
