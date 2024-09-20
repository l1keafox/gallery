"use client";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent,
} from "@storyblok/react/rsc";
import { StoryblokAsset, StoryblokSizes } from "@/helpers/storyblok";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { tv } from "tailwind-variants";
import { RenderRichText } from "./Text";
import {
  HeadlineSolidWord,
  HeadlineOutlineWord,
  Headline,
} from "@ui/FormatHeadline";

export interface ProjectBlokData {
  name: string;
  urls: {
    url: string;
    _uid: string;
  }[];
  image: StoryblokAsset;
  blurb: string;
  text: {
    text: {
      type: string;
      content: any[];
    };
  };
  technology: string;
}

export interface DisplayProjectsBlokData extends SbBlokData {
  projects: ProjectBlokData[];
  aspectCard: boolean;
  cardWidth: StoryblokSizes;
}

export interface CardCarouselProps {
  blok: DisplayProjectsBlokData;
}

const CardCarouselStyles = tv(
  {
    slots: {
      scrollRoot:
        "w-full overflow-x-scroll scrollbar-hide mb-4 md:mb-8 lg:mb-16 px-2",
      card: "w-96 bg-blue-50rounded-md border-solid border-black border-2 hover:shadow-lg shadow-md flex flex-col rounded-md group",
    },
    variants: {
      cardWidth: {
        //[1,2,3,4,6,8,10,14,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,88,96]
        1: { card: "w-1" },
        2: { card: "w-2" },
        3: { card: "w-3" },
        4: { card: "w-4" },
        6: { card: "w-6" },
        8: { card: "w-8" },
        10: { card: "w-10" },
        14: { card: "w-14" },
        16: { card: "w-16" },
        20: { card: "w-20" },
        24: { card: "w-24" },
        28: { card: "w-28" },
        32: { card: "w-32" },
        36: { card: "w-36" },
        40: { card: "w-40" },
        44: { card: "w-44" },
        48: { card: "w-48" },
        52: { card: "w-52" },
        56: { card: "w-56" },
        60: { card: "w-60" },
        64: { card: "w-64" },
        68: { card: "w-68" },
        72: { card: "w-72" },
        76: { card: "w-76" },
        80: { card: "w-80" },
        88: { card: "w-88" },
        96: { card: "w-96" },
      },
      aspectCard: {
        true: {
          card: "aspect-card",
        },
      },
      screenPseudo: {
        md: {
          scrollRoot: "px-4",
        },
        lg: {
          scrollRoot: "px-6",
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

export function CardCarousel({ blok }: CardCarouselProps) {
  const projectScroll = useRef<HTMLDivElement>(null);
  const [scrollLeftPos, setScrollLeftPos] = useState(1);
  const { aspectCard, cardWidth } = blok;
  const { scrollRoot, card } = CardCarouselStyles({
    aspectCard,
    cardWidth: cardWidth?.value ?? 96,
    screenPseudo: {
      md: "md",
      lg: "lg",
      xl: "xl",
      "2xl": "2xl",
    },
  });
  // console.log(blok.projects);

  const scrollLeft = () => {
    // make projectScroll scroll smoothly.
    if (projectScroll.current) {
      projectScroll.current.scrollTo({
        left: projectScroll.current.scrollLeft - 450,
        behavior: "smooth",
      });
    }
    setScrollLeftPos(projectScroll?.current?.scrollLeft ?? 0);
  };
  const scrollRight = () => {
    if (projectScroll.current) {
      projectScroll.current.scrollTo({
        left: projectScroll.current.scrollLeft + 450,
        behavior: "smooth",
      });
    }
    setScrollLeftPos(projectScroll?.current?.scrollLeft ?? 0);
  };

  useEffect(() => {
    setScrollLeftPos(projectScroll?.current?.scrollLeft ?? 0);
  }, []);

  return (
    <div className="w-full h-fit relative" {...storyblokEditable(blok)}>
      <div
        className={scrollRoot()}
        ref={projectScroll}
        onScroll={() =>
          setScrollLeftPos(projectScroll?.current?.scrollLeft ?? 0)
        }
      >
        <div className="max-w-screen-2xl relative mx-auto">
          <div className="flex w-fit gap-4 py-8 lg:px-2 xl:px-8">
            {blok.projects?.map((project, idx) => (
              <StoryblokComponent
                key={project.name ?? idx}
                blok={project}
                className={card()}
              />
            ))}
          </div>
        </div>

        <button
          onClick={scrollLeft}
          className={`absolute left-4 md:left-10 rounded-full top-1/2 -translate-y-1/2 size-8 md:size-16 bg-blue-100 hover:bg-blue-900 hover:text-white flex items-center justify-center ${
            scrollLeftPos < 5 ? "hidden" : ""
          } `}
        >
          <FaAngleLeft className="size-6 md:size-8" />
        </button>

        <button
          onClick={scrollRight}
          className={`absolute right-4 md:right-10 rounded-full top-1/2 -translate-y-1/2 size-8 md:size-16 bg-blue-100 hover:bg-blue-900  hover:text-white flex items-center justify-center ${
            scrollLeftPos ===
            (projectScroll?.current?.scrollWidth ?? 0) -
              (projectScroll?.current?.clientWidth ?? 0)
              ? "hidden"
              : ""
          }`}
        >
          <FaAngleRight className="size-6 md:size-8" />
        </button>
      </div>
    </div>
  );
}

interface FormattedTitleProps {
  title: string;
}
function FormattedTitle({ title }: FormattedTitleProps) {
  const titleArr = title.split(" ");
  return (
    <Headline>
      <HeadlineSolidWord className="text-primary">
        {titleArr[0]}{" "}
      </HeadlineSolidWord>
      <HeadlineOutlineWord>{titleArr.splice(1).join(" ")}</HeadlineOutlineWord>
    </Headline>
  );
}

export interface ProjectCardProps {
  blok: ProjectBlokData;
  className: string;
}

export function Project({ blok, className }: ProjectCardProps) {
  return (
    <div className={className}>
      <Link
        href={blok.urls[0]?.url ?? "#"}
        className="w-full aspect-video overflow-hidden items-center justify-center flex mb-2 border-b-2 border-solid border-gray-3"
      >
        <Image
          src={blok.image.filename}
          alt={blok.image.alt ?? "something"}
          className="object-fill group-hover:scale-105 transition-transform duration-300 ease-in-out relative"
          width={880}
          height={1100}
        />
      </Link>

      <h1 className="font-black uppercase text-2xl font-grotesk w-full text-center mb-2">
        <FormattedTitle title={blok.name} />
      </h1>
      {blok.text && <RenderRichText className="px-2" text={blok.text} />}
    </div>
  );
}
