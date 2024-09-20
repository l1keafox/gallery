import { tv } from "tailwind-variants";
import { StoryImage } from "../../StoryImage";
import {
  SbBlokData,
  StoryblokComponent,
  storyblokEditable,
} from "@storyblok/react/rsc";
import { StoryblokAsset } from "@/helpers/storyblok";

// const ImageBackgroundStyles = tv({
//   variants: {

//   },
//   slots: {
//     root: "overfill-hidden w-screen h-screen fixed top-0 inset-0",
//   },
// });

const ImageBackgroundStyles = tv({
  variants: {
    opacity: {
      0: { root: "opacity-0" },
      10: { root: "opacity-10" },
      20: { root: "opacity-20" },
      30: { root: "opacity-30" },
      40: { root: "opacity-40" },
      50: { root: "opacity-50" },
      60: { root: "opacity-60" },
      70: { root: "opacity-70" },
      80: { root: "opacity-80" },
      90: { root: "opacity-90" },
      100: { root: "opacity-100" },
    },
  },
  slots: {
    root: "relative flex items-center justify-center overflow-hidden",
  },
});

export interface ImageBlockDatablok extends SbBlokData {
  blur?: { value: number };
  asset: StoryblokAsset;
  rotate?: 90 | 180 | 270;
  opacity?: {
    value: 100 | 90 | 80 | 70 | 60 | 50 | 40 | 30 | 20 | 10 | 0;
  };
  quality?: { value: number };
  grayscale?: boolean;
  smart?: boolean;
  brightness?: { value: number };
  verticalFlip?: boolean;
  horizontalFlip?: boolean;
}

export interface ImageBackgroundProps {
  blok: ImageBlockDatablok;
  className?: string;
}

export function ImageBackground({ blok, className }: ImageBackgroundProps) {
  const { opacity } = blok;
  const { root } = ImageBackgroundStyles({
    opacity: opacity?.value ?? 100,
  });

  return (
    <div className={root({ className })} {...storyblokEditable(blok)}>
      {/* {blok.asset[0] && (
        <StoryblokComponent
          blok={blok.asset[0]}
          className=""
        />
      )} */}
    </div>
  );
}
