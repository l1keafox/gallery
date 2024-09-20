import { StoryblokJustify, StoryblokSizes } from "@/helpers/storyblok";
import { Entertainer } from "@ui/Entertainer";
import { tv } from "tailwind-variants";
import {
  StoryblokComponent,
  SbBlokData,
  storyblokEditable,
} from "@storyblok/react/rsc";

const HalfAndHalfStyles = tv(
  {
    variants: {
      gap: {
        1: { root: "gap-1" },
        2: { root: "gap-2" },
        3: { root: "gap-3" },
        4: { root: "gap-4" },
        5: { root: "gap-5" },
        6: { root: "gap-6" },
        7: { root: "gap-7" },
        8: { root: "gap-8" },
        9: { root: "gap-9" },
        10: { root: "gap-10" },
        14: { root: "gap-14" },
        16: { root: "gap-16" },
        20: { root: "gap-20" },
        24: { root: "gap-24" },
        28: { root: "gap-28" },
        32: { root: "gap-32" },
        36: { root: "gap-36" },
        40: { root: "gap-40" },
        44: { root: "gap-44" },
        48: { root: "gap-48" },
        52: { root: "gap-52" },
        56: { root: "gap-56" },
        60: { root: "gap-60" },
        64: { root: "gap-64" },
        68: { root: "gap-68" },
        72: { root: "gap-72" },
        76: { root: "gap-76" },
        80: { root: "gap-80" },
        88: { root: "gap-88" },
        96: { root: "gap-96" },
      },
      screenPseudo: {
        md: {
          root: "flex-row py-4 mb-8",
        },
        lg: {
          root: "flex-row py-0 mb-16",
        },
        xl: {},
        "2xl": {},
      },
      phonePadding: {
        false: { root: "px-0 md:px-0" },
      },
      justify: {
        start: { root: "justify-start" },
        end: { root: "justify-end" },
        center: { root: "justify-center" },
        between: { root: "justify-between" },
        around: { root: "justify-around" },
        evenly: { root: "justify-evenly" },
      },
      wrap: {
        true: { root: "flex-wrap" },
      },
    },
    slots: {
      root: "flex w-full flex-col mb-4",
      image: "shadow-lg",
    },
  },
  {
    responsiveVariants: ["md", "lg", "xl", "2xl"],
  },
);

interface HalfAndHalfBlokData extends SbBlokData {
  assets: any[];
  phonePadding: boolean;
  justify: StoryblokJustify;
  gap: StoryblokSizes;
  wrap: boolean;
}

export interface HalfAndHalfProps {
  blok: HalfAndHalfBlokData;
}

export function HalfAndHalf({ blok }: HalfAndHalfProps) {
  const { root } = HalfAndHalfStyles({
    justify: blok.justify,
    gap: blok.gap?.value,
    wrap: blok.wrap,
    phonePadding: blok.phonePadding,
    screenPseudo: {
      md: "md",
      lg: "lg",
      xl: "xl",
      "2xl": "2xl",
    },
  });
  return (
    <Entertainer className={root()} {...storyblokEditable(blok)}>
      {blok.assets?.map((nestedBlok, idx) => (
        <StoryblokComponent
          key={nestedBlok._uid ?? idx}
          blok={nestedBlok}
          phonePadding={blok.phonePadding}
        />
      ))}
    </Entertainer>
  );
}
