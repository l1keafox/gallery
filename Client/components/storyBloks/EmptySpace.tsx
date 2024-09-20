import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";
import { tv } from "tailwind-variants";
import { StoryblokSizes } from "@/helpers/storyblok";
const EmptySpaceStyles = tv(
  {
    slots: {
      root: "w-full max-h-8",
    },
    variants: {
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
          root: "max-h-12",
        },
        lg: {
          root: "max-h-16",
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

interface EmptySpaceBlokData extends SbBlokData {
  height: StoryblokSizes;
}

export interface EmptySpaceProps {
  blok: EmptySpaceBlokData;
}

export function EmptySpace({ blok }: EmptySpaceProps) {
  const { height } = blok;
  const { root } = EmptySpaceStyles({
    height: height.value ?? 16,
    screenPseudo: {
      md: "md",
      lg: "lg",
      xl: "xl",
      "2xl": "2xl",
    },
  });
  return <div className={root()} {...storyblokEditable(blok)}></div>;
}
