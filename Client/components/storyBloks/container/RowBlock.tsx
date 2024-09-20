import {
  StoryblokComponent,
  SbBlokData,
  storyblokEditable,
} from "@storyblok/react/rsc";
import { Entertainer } from "@ui/Entertainer";
import { tv } from "tailwind-variants";

const RowBlockStyles = tv({
  slots: {
    root: "w-full flex mb-4 md:mb-8 lg:mb-16 flex-row flex-wrap px-2",
    image: "",
  },
  variants: {
    wrap: {
      true: {
        root: "flex-wrap",
      },
    },
    justify: {
      start: { root: "justify-start" },
      end: { root: "justify-end" },
      center: { root: "justify-center" },
      between: { root: "justify-between" },
      around: { root: "justify-around" },
      evenly: { root: "justify-evenly" },
    },
    align: {
      start: {
        root: "items-start",
      },
      end: {
        root: "items-end",
      },
      center: {
        root: "items-center",
      },
      baseline: {
        root: "items-baseline",
      },
      stretch: {
        root: "items-stretch",
      },
    },
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
  },
});

import {
  StoryblokSizes,
  StoryblokJustify,
  StoryblokAlign,
} from "@/helpers/storyblok";

export interface RowBlokData extends SbBlokData {
  body: any[];
  justify: StoryblokJustify;
  align: StoryblokAlign;
  gap: StoryblokSizes;
  wrap?: boolean;
}

export interface RowBlockProps {
  blok: RowBlokData;
}

export function RowBlock({ blok }: RowBlockProps) {
  const { gap, justify, align, wrap } = blok;
  const { root } = RowBlockStyles({
    gap: gap.value,
    wrap,
    align,
    justify,
  });

  return (
    <Entertainer className={root()} {...storyblokEditable(blok)}>
      {blok.body.map((nestedBlok, idx) => (
        <StoryblokComponent key={nestedBlok._uid ?? idx} blok={nestedBlok} />
      ))}
    </Entertainer>
  );
}
