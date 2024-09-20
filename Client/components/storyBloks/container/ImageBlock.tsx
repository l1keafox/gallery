import { SbBlokData } from "@storyblok/react/rsc";
import { StoryImage } from "../../StoryImage";
import { tv } from "tailwind-variants";
import {
  StoryblokAsset,
  StoryblokSizes,
  StoryblokAspect,
  StoryblokRounded,
  StoryblokScale,
} from "@/helpers/storyblok";

export interface ImageBlockDatablok extends SbBlokData {
  asset: StoryblokAsset;
  width: StoryblokSizes;
  rounded: StoryblokRounded;
  aspect: StoryblokAspect;
  grayscale?: boolean;
  smart?: boolean;
  blur?: { value: number };
  quality?: { value: number };
  brightness?: { value: number };
  rotate?: 90 | 180 | 270;
  widthScale?: StoryblokScale;
  priority?: boolean;
  verticalFlip?: boolean;
  horizontalFlip?: boolean;
}

export interface ImageBlockProps {
  blok: ImageBlockDatablok;
  className?: string;
}

const ImageStyles = tv(
  {
    variants: {
      widthScale: {
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
      rounded: {
        none: { root: "" },
        small: { root: "rounded-sm" },
        medium: { root: "rounded-md" },
        large: { root: "rounded-lg" },
        full: { root: "rounded-full" },
        xlarge: { root: "rounded-xl" },
        "2xlarge": { root: "rounded-2xl" },
        "3xlarge": { root: "rounded-3xl" },
      },
      aspect: {
        card: {
          root: "aspect-card",
        },
        square: {
          root: "aspect-square",
        },
        video: {
          root: "aspect-video",
        },
        wide: {
          root: "aspect-wide",
        },
        legal: {
          root: "aspect-legal",
        },
        letter: {
          root: "aspect-letter",
        },
        none: {
          root: "",
        },
      },
    },
    slots: {
      root: "relative flex items-center justify-center overflow-hidden",
    },
  },
  {
    responsiveVariants: ["md", "lg", "xl", "2xl"],
  },
);

export function ImageBlock({ blok, className }: ImageBlockProps) {
  const {
    aspect,
    widthScale,
    grayscale,
    smart,
    rotate,
    blur,
    quality,
    brightness,
    verticalFlip,
    horizontalFlip,
    priority,
    rounded,
  } = blok;
  const { root } = ImageStyles({
    aspect,
    widthScale,
    rounded,
  });

  let heightImage = 4096;
  let widthImage = 4096;

  switch (aspect) {
    case "card":
      // card: "63 / 88",
      heightImage = 5721;
      widthImage = 4096;
      break;

    case "letter":
      // letter: "8.5 / 11",
      heightImage = 4096;
      widthImage = 3165;
      break;

    case "legal":
      // legal: "8.5 / 14",
      heightImage = 4096;
      widthImage = 2486;
      break;

    case "wide":
      // wide: "16 / 5",
      heightImage = 1280;
      widthImage = 4096;
      break;

    case "video":
      // video: "16 / 9",
      heightImage = 2304;
      widthImage = 4096;
      break;
  }

  return (
    <div className={root({ className })}>
      <StoryImage
        grayscale={grayscale}
        priority={priority}
        smart={smart}
        blur={blur?.value}
        quality={quality?.value}
        brightness={brightness?.value}
        verticalFlip={verticalFlip}
        horizontalFlip={horizontalFlip}
        rotate={rotate}
        className="object-fit w-full h-full"
        src={blok.asset}
        alt={blok.asset.alt ?? "nothing"}
        height={heightImage}
        width={widthImage}
        sizes="100vw"
      />
    </div>
  );
}
