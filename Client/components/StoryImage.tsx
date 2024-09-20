import Image, { ImageProps, StaticImageData } from "next/image";
import { StoryblokAsset } from "@/helpers/storyblok";

export interface StoryImageProps
  extends Omit<ImageProps, "src" | "width" | "height" | "alt"> {
  blur?: number;
  quality?: number;
  brightness?: number;
  alt: string;
  src: StoryblokAsset | string | StaticImageData;
  noFocal?: boolean;
  smart?: boolean;
  verticalFlip?: boolean;
  horizontalFlip?: boolean;
  rotate?: 90 | 180 | 270;
  format?: `webp` | `jpeg` | `png`;
  grayscale?: boolean;
  width?: number;
  height?: number;
}

export function StoryImage({
  quality,
  grayscale,
  format,
  rotate,
  smart,
  blur,
  brightness,
  src,
  alt,
  width,
  height,
  verticalFlip = false,
  horizontalFlip = false,
  noFocal = false,
  ...props
}: StoryImageProps) {
  let imageUrl = "";
  if (typeof src === "string") {
    // this means it's a filename passed maybe we should error out here.
    imageUrl = `${src}`;
    console.log("StoryImage passed String");
  } else if (typeof src !== "string" && "src" in src) {
    // Static image does not need height/width
    return <Image {...props} src={src} alt={alt} />;
  } else if (typeof src !== "string" && "filename" in src) {
    imageUrl = `${src.filename}`;
  }

  imageUrl += `/m/`;
  imageUrl += `${horizontalFlip ? "-" : ""}${width ?? 1000}x`;
  imageUrl += `${verticalFlip ? "-" : ""}${height ?? 0}`;

  if (smart) {
    // Smart with AI to get around head shots.
    imageUrl += "/smart";
  }

  // console.log(imageUrl);
  if (
    typeof src !== "string" &&
    "filename" in src &&
    (quality ||
      format ||
      grayscale ||
      blur ||
      src?.focus ||
      rotate ||
      brightness)
  ) {
    imageUrl += `/filters`;
    if ("filename" in src && src?.focus && !noFocal) {
      imageUrl += `:focal(${src.focus})`;
    }

    if (quality) {
      imageUrl += `:quality(${
        quality > 100 ? 100 : quality < 0 ? 0 : quality
      })`;
    }

    if (format) {
      imageUrl += `:format(${format})`;
    }
    if (grayscale) {
      imageUrl += `:grayscale()`;
    }

    if (blur) {
      imageUrl += `:blur(${blur > 150 ? 150 : blur < 0 ? 0 : blur})`;
    }

    if (rotate) {
      imageUrl += `:rotate(${rotate})`;
    }

    if (brightness !== undefined) {
      imageUrl += `:brightness(${
        brightness > 150 ? 150 : brightness < -150 ? -150 : brightness
      })`;
    }
  }

  return (
    <Image
      {...props}
      src={imageUrl}
      height={height}
      width={height}
      alt={alt}
      quality={quality}
    />
  );
}
