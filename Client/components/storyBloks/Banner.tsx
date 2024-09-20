import {
  StoryblokAsset,
  StoryblokSizes,
  StoryblokFonts,
} from "@/helpers/storyblok";
import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import { StoryImage } from "../StoryImage";
import { tv } from "tailwind-variants";

interface BannerBlokData extends SbBlokData {
  bannerText: string;
  bannerFont: StoryblokFonts;
  fullImage: StoryblokAsset;
  circleImage: StoryblokAsset;
  fullScreen: boolean;
  height: StoryblokSizes;
}

export interface BannerProps {
  blok: BannerBlokData;
}
const heroStyles = tv(
  {
    slots: {
      root: "flex items-center justify-center relative",
      circle: "size-24 rounded-full absolute left-4 -bottom-16",
      text: "absolute -bottom-16 left-40 text-2xl",
    },
    variants: {
      fullScreen: {
        true: "w-full",
        false: {
          root: "mx-auto max-w-screen-2xl",
        },
      },
      circleImage: {
        false: {
          root: "mb-4 md:mb-8 lg:mb-16",
        },
        true: {
          root: "mb-16",
        },
      },
      bannerFont: {
        "font-grotesk": { text: "font-grotesk" },
        "font-roboto": { text: "font-roboto" },
        "font-noto": { text: "font-noto" },
        "font-garamond": { text: "font-garamond" },
        "font-crimson": { text: "font-crimson" },
        "font-sans": { text: "font-sans" },
      },
      screenPseudo: {
        md: {
          text: "text-3xl left-48",
          circle: "size-32 left-6",
        },
        lg: {
          text: "text-4xl left-48 -bottom-12",
          circle: "size-32 left-8",
        },
        xl: {},
        "2xl": {},
      },
      //[1,2,3,4,6,8,10,14,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,88,96]
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
    },
  },
  {
    responsiveVariants: ["md", "lg", "xl", "2xl"], // `true` to apply to all screen sizes
  },
);

export function Banner({ blok }: BannerProps) {
  const { fullScreen, bannerFont } = blok;
  const { root, circle, text } = heroStyles({
    fullScreen,
    circleImage: blok.circleImage.filename ? true : false,
    screenPseudo: {
      md: "md",
      lg: "lg",
      xl: "xl",
      "2xl": "2xl",
    },
    bannerFont: bannerFont ?? "font-roboto",
    height: blok.height.value ?? 32,
  });
  return (
    <div className={root()} {...storyblokEditable(blok)}>
      {blok.fullImage?.filename && (
        <StoryImage
          src={blok.fullImage}
          alt={blok.fullImage.alt ?? "full image"}
          width={2850}
          height={850}
          priority
          className="w-full h-full object-cover"
        />
      )}
      <div className={circle()}>
        {blok.circleImage?.filename && (
          <StoryImage
            src={blok.circleImage}
            alt={blok.circleImage.alt ?? "circle image"}
            width={300}
            height={300}
            priority
            className="rounded-full"
          />
        )}
      </div>
      <div className={text()}>{blok.bannerText}</div>
    </div>
  );
}
