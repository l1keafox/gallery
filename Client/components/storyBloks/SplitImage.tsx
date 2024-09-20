import Link from "next/link";
import { Button } from "../ui/Button";
import { StoryblokAsset } from "@/helpers/storyblok";
import Image from "next/image";
import { Error } from "../ui/Error";
import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";

export interface SplitImageBlokData extends SbBlokData {
  // splitImage:StoryblokAsset
  link: string;
  image: StoryblokAsset;
  linkText: string;
  blurb: string;
  title: string;
}

export interface SplitImageProps {
  blok: SplitImageBlokData;
}

export function SplitImage({ blok }: SplitImageProps) {
  if (!blok.link) {
    return <Error page={false} />;
  }
  return (
    <section
      className="w-full min-h-[650px] relative overflow-hidden flex items-center justify-center max-md:flex-col mb-4 md:mb-8 lg:mb-16"
      {...storyblokEditable(blok)}
    >
      <div className="flex flex-col max-md:px-6 md:w-96 justify-center">
        <h1 className="text-5xl mb-6 uppercase font-black">{blok.title}</h1>
        <h2 className="text-xl mb-4 uppercase">{blok.blurb}</h2>
        <Button asChild>
          <Link className="w-72" href={blok?.link ?? "#"} target="_blank">
            {blok?.linkText}
          </Link>
        </Button>
      </div>
      <div className="md:absolute mx-4 my-6  aspect-[4/5] border-2 border-solid border-gray-3 md:top-0 md:left-0 md:-translate-x-2/3 lg:-translate-x-1/2">
        {blok.image?.filename && (
          <Image
            src={blok.image.filename}
            alt={blok.image.alt}
            height={640}
            width={480}
            className="object-cover"
          />
        )}
      </div>
      <div className="max-md:hidden absolute h-full aspect-[4/5] border-2 border-solid border-gray-3 top-0 right-0 md:translate-x-2/3 lg:translate-x-1/2">
        {blok.image?.filename && (
          <Image
            src={blok.image.filename}
            alt={blok.image.alt}
            fill
            className="object-fill"
          />
        )}
      </div>
    </section>
  );
}
