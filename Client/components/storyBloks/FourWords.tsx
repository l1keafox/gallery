import { StoryblokAsset } from "@/helpers/storyblok";
import { useState, useEffect } from "react";
import Image from "next/image";
import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";
import { tv } from "tailwind-variants";

export interface FourWordsBlokData extends SbBlokData {
  words: string;
  assets: StoryblokAsset[];
}

export interface FourWordsProps {
  blok: FourWordsBlokData;
}

const FourWordsStyles = tv(
  {
    slots: {
      root: "relative flex max-w-screen-2xl w-full items-center mx-auto md:min-h-[325px] lg:min-h-[650px] flex-col md:flex-row mb-4 md:mb-8 lg:mb-16",
      images:
        "md:absolute md:w-1/2 md:right-0 md:top-0 md:h-full flex items-center",
      words:
        "text-3xl lg:text-5xl xl:text-7xl uppercase font-black font-grotesk max-md:mb-8",
    },
    variants: {
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

export function FourWords({ blok }: FourWordsProps) {
  // Four words will be up to 3 parts
  const wordArray = blok.words.split(",");
  const [index, setIndex] = useState(0);
  //const {} = blok
  const { root, words, images } = FourWordsStyles({
    screenPseudo: {
      md: "md",
      lg: "lg",
      xl: "xl",
      "2xl": "2xl",
    },
  });

  useEffect(() => {
    // every 5000ms add +1 to index, if +1 to index is greater than wordArray.length then it resets to 0
    const second = setInterval(() => {
      setIndex((index) => {
        if (index + 1 > wordArray.length - 1) {
          return 0;
        } else {
          return index + 1;
        }
      });
    }, 5000);
    return () => clearInterval(second);
  }, [wordArray.length]);

  return (
    <section className={root()} {...storyblokEditable(blok)}>
      <div className={words()}>
        {wordArray.map((word, idx) => (
          <div key={word} className="flex items-center">
            <button
              key={word + idx}
              onClick={() => setIndex(idx)}
              className={`ml-4 h-6 w-6 rounded-full ${
                idx === index
                  ? "bg-darkprimary"
                  : "border-2 border-solid border-darkprimary"
              }`}
            />
            <button
              key={word}
              onClick={() => setIndex(idx)}
              className={`ml-4 uppercase ${
                idx === index
                  ? "text-transparent [-webkit-text-stroke:2px_black]"
                  : ""
              } `}
            >
              {word}
            </button>
          </div>
        ))}
      </div>
      <div className={images()}>
        {blok.assets[index]?.filename && (
          <Image
            src={blok.assets[index].filename}
            alt=" "
            height={1600}
            width={1280}
            className="object-cover "
          />
        )}
      </div>
    </section>
  );
}
