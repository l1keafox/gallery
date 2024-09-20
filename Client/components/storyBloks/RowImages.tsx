import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";
import { StoryblokAsset } from "@/helpers/storyblok";
import { StoryImage } from "@/components/StoryImage";
import { Entertainer } from "@ui/Entertainer";
import { tv } from "tailwind-variants";

const RowImagesStyles = tv(
  {
    slots: {
      root: "flex flex-wrap justify-center items-center w-full gap-4 mb-8",
      imageClassName: "relative overflow-hidden shadow-lg ",
    },
    variants: {
      imageRounded: {
        small: {
          imageClassName: "rounded-sm",
        },
        medium: {
          imageClassName: "rounded-md",
        },
        large: {
          imageClassName: "rounded-lg",
        },
        xlarge: {
          imageClassName: "rounded-xl",
        },
        "2xlarge": {
          imageClassName: "rounded-2xl",
        },
        "3xlarge": {
          imageClassName: "rounded-3xl",
        },
        full: {
          imageClassName: "rounded-full",
        },
        none: {
          imageClassName: "rounded-none",
        },
      },
      imageSize: {
        //[1,2,3,4,6,8,10,14,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,88,96]
        1: { imageClassName: "w-1" },
        2: { imageClassName: "w-2" },
        3: { imageClassName: "w-3" },
        4: { imageClassName: "w-4" },
        6: { imageClassName: "w-6" },
        8: { imageClassName: "w-8" },
        10: { imageClassName: "w-10" },
        14: { imageClassName: "w-14" },
        16: { imageClassName: "w-16" },
        20: { imageClassName: "w-20" },
        24: { imageClassName: "w-24" },
        28: { imageClassName: "w-28" },
        32: { imageClassName: "w-32" },
        36: { imageClassName: "w-36" },
        40: { imageClassName: "w-40" },
        44: { imageClassName: "w-44" },
        48: { imageClassName: "w-48" },
        52: { imageClassName: "w-52" },
        56: { imageClassName: "w-56" },
        60: { imageClassName: "w-60" },
        64: { imageClassName: "w-64" },
        68: { imageClassName: "w-68" },
        72: { imageClassName: "w-72" },
        76: { imageClassName: "w-76" },
        80: { imageClassName: "w-80" },
        88: { imageClassName: "w-88" },
        96: { imageClassName: "w-96" },
      },
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
        between: {
          root: "justify-between",
        },
        around: {
          root: "justify-around",
        },
        evenly: {
          root: "justify-evenly",
        },
        stretch: {
          root: "justify-stretch",
        },
      },
      aspect: {
        card: {
          imageClassName: "aspect-card",
        },
        square: {
          imageClassName: "aspect-square",
        },
        video: {
          imageClassName: "aspect-video",
        },
        letter: {
          imageClassName: "aspect-letter",
        },
        wide: {
          imageClassName: "aspect-wide",
        },
        legal: {
          imageClassName: "aspect-legal",
        },
        none: {
          imageClassName: "",
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
import {
  StoryblokSizes,
  StoryblokRounded,
  StoryblokJustify,
  StoryblokAspect,
} from "@/helpers/storyblok";

interface RowImagesBlokData extends SbBlokData {
  images: StoryblokAsset[];
  imageSize: StoryblokSizes;
  imageRounded: StoryblokRounded;
  justify: StoryblokJustify;
  aspect: StoryblokAspect;
}

export interface RowImagesProps {
  blok: RowImagesBlokData;
}

export function RowImages({ blok }: RowImagesProps) {
  const { imageSize, aspect, justify, imageRounded } = blok;
  const { root, imageClassName } = RowImagesStyles({
    imageSize: imageSize.value,
    imageRounded,
    justify,
    aspect,
    screenPseudo: {
      md: "md",
      lg: "lg",
      xl: "xl",
      "2xl": "2xl",
    },
  });

  return (
    <Entertainer asChild {...storyblokEditable(blok)}>
      <section className={root()}>
        {blok.images.map((image, idx) => (
          <div key={idx} className={imageClassName()}>
            {image?.filename && (
              <StoryImage
                className="object-cover absolute top-0 left-0"
                src={image}
                fill
                alt={image.alt ?? "something"}
              />
            )}
          </div>
        ))}
      </section>
    </Entertainer>
  );
}
