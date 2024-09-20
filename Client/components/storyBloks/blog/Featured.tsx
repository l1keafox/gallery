import { HeroBlokData } from "../Hero";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import { Entertainer } from "@ui/Entertainer";
import { StoryImage } from "../../StoryImage";
import { StoryblokFonts } from "@/helpers/storyblok";
import { tv } from "tailwind-variants";
import {
  HeadlineSolidWord,
  HeadlineOutlineWord,
  Headline,
} from "@ui/FormatHeadline";

export interface FeaturedProps {
  blok: {
    featured: {
      content: {
        body: HeroBlokData[];
      };
      full_slug: string;
    }[];
    headline: string;
    font: StoryblokFonts;
  };
}

const FeaturedStyles = tv({
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
  },
  slots: {
    root: "w-full min-h-112 mb-4 md:mb-8 lg:mb-16",
  },
});

export function Featured({ blok }: FeaturedProps) {
  const { root } = FeaturedStyles({
    font: blok.font,
  });
  const storyBodyOne = blok.featured[0]?.content?.body;
  const storyBodyTwo = blok.featured[1]?.content?.body;
  const storyBodyThree = blok.featured[2]?.content?.body;
  const storyOneMetadata = storyBodyOne?.find(
    (blok) => blok.component === "Metadata",
  );
  const storyTwoMetadata = storyBodyTwo?.find(
    (blok) => blok.component === "Metadata",
  );
  const storyThreeMetadata = storyBodyThree?.find(
    (blok) => blok.component === "Metadata",
  );
  const titleArr = blok?.headline?.split(" ") ?? [];
  return (
    <Entertainer asChild>
      <section className={root()} {...storyblokEditable(blok)}>
        <Headline className="uppercase text-4xl md:text-5xl font-bold mb-8">
          <HeadlineOutlineWord>{titleArr[0]} </HeadlineOutlineWord>
          <HeadlineSolidWord className="text-black">
            {titleArr.splice(1).join(" ")}
          </HeadlineSolidWord>
        </Headline>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {storyOneMetadata && (
            <Blog
              MetadataStory={storyOneMetadata}
              slug={blok.featured[0].full_slug}
            />
          )}
          {storyTwoMetadata && (
            <Blog
              MetadataStory={storyTwoMetadata}
              slug={blok.featured[1].full_slug}
            />
          )}
          {storyThreeMetadata && (
            <Blog
              MetadataStory={storyThreeMetadata}
              slug={blok.featured[2].full_slug}
            />
          )}
        </div>
      </section>
    </Entertainer>
  );
}

interface BlogProps {
  MetadataStory?: any;
  slug: string;
}

function Blog({ MetadataStory, slug }: BlogProps) {
  return (
    <Link
      href={slug}
      className="border-2 border-solid border-gray-3 group shadow-md hover:shadow-lg"
    >
      <div className="w-full aspect-video overflow-hidden">
        {MetadataStory.images[0] && (
          <StoryImage
            src={MetadataStory.images[0]}
            width={640}
            height={480}
            alt={MetadataStory.images[0].alt ?? "test"}
            className="group-hover:scale-110 transition-transform w-full"
          />
        )}
      </div>
      <h1 className="uppercase text-3xl font-black font-grotesk text-center my-4">
        {MetadataStory.title}{" "}
      </h1>
      <h3 className="font-roboto px-6 mb-8">{MetadataStory.description}</h3>
    </Link>
  );
}
