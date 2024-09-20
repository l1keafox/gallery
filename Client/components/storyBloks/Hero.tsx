import { StoryblokAsset } from "@/helpers/storyblok";
import Image from "next/image";
import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import { tv } from "tailwind-variants";
import { StoryblokFonts } from "@/helpers/storyblok";
import { FormatHeadline } from "@ui/FormatHeadline";

export interface HeroBlokData extends SbBlokData {
  headline: string;
  headlineFont: StoryblokFonts;
  blurbFont: StoryblokFonts;
  background: StoryblokAsset;
  blurb: string;
  textAlign: "left" | "center" | "right";
}

export interface HeroProps {
  blok: HeroBlokData;
}

const heroStyles = tv(
  {
    slots: {
      root: "mx-auto w-full min-h-48 flex max-w-screen-2xl items-center justify-center flex-col relative overflow-hidden mb-4 md:mb-8 lg:mb-16",
      headline:
        "container mx-auto h-full px-2 md:px-6 lg:px-8 pt-32 flex flex-col",
      blurb: "md:hidden w-full container px-2 md:px-6 lg:px-8 max-w-screen-md",
      topblurb: "font-roboto hidden md:block text-left max-w-screen-sm",
      gradient:
        "absolute inset-0 bg-gradient-to-t from-white from-1% to-transparent to-10%",
      gradient2:
        "absolute inset-0 bg-gradient-to-tr from-white from-5% to-transparent to-35%",
      gradient3:
        "absolute inset-0 bg-gradient-to-r from-white from-25% to-transparent to-45%",
    },
    variants: {
      headlineFont: {
        "font-grotesk": {
          headline: "font-grotesk",
        },
        "font-roboto": {
          headline: "font-roboto",
        },
        "font-noto": {
          headline: "font-noto",
        },
        "font-garamond": {
          headline: "font-garamond",
        },
        "font-crimson": {
          headline: "font-crimson",
        },
        "font-sans": {
          headline: "font-sans",
        },
      },
      blurbFont: {
        "font-grotesk": {
          blurb: "font-grotesk",
          topblurb: "font-grotesk",
        },
        "font-roboto": {
          blurb: "font-roboto",
          topblurb: "font-roboto",
        },
        "font-noto": {
          blurb: "font-noto",
          topblurb: "font-noto",
        },
        "font-garamond": {
          blurb: "font-garamond",
          topblurb: "font-garamond",
        },
        "font-crimson": {
          blurb: "font-crimson",
          topblurb: "font-crimson",
        },
        "font-sans": {
          blurb: "font-sans",
          topblurb: "font-sans",
        },
      },
      screenPseudo: {
        md: {
          root: "min-h-96 flex-row mb-4",
          headline: "pt-0 px-0 ",
        },
        lg: {
          root: " min-h-[650px]",
          headline: "text- pt-0",
        },
        xl: {
          root: "",
          headline: "pt-0",
        },
        "2xl": {
          root: "",
          headline: "pt-0",
        },
      },
      textAlign: {
        left: {
          headline: "",
        },
        center: {
          headline: "justify-center items-center",
          blurb: "justify-center items-center",
          gradient:
            "absolute inset-0 bg-gradient-to-t from-transpaent from-1% to-transparent to-15%",
          gradient2:
            "absolute inset-0 bg-gradient-to-tr from-transpaent from-5% to-transparent to-25%",
          gradient3:
            "absolute inset-0 bg-gradient-to-tl from-transpaent from-5% to-transparent to-25%",
        },
        right: {
          headline: "justify-end items-end text-right",
          blurb: "justify-end items-end text-right",
          gradient:
            "absolute inset-0 bg-gradient-to-t from-white from-1% to-transparent to-10%",
          gradient2:
            "absolute inset-0 bg-gradient-to-tl from-white from-5% to-transparent to-35%",
          gradient3:
            "absolute inset-0 bg-gradient-to-l from-white from-25% to-transparent to-45%",
        },
      },
    },
  },
  {
    responsiveVariants: ["md", "lg", "xl", "2xl"], // `true` to apply to all screen sizes
  },
);

export function Hero({ blok }: HeroProps) {
  const { textAlign, headlineFont, blurbFont } = blok;
  const { root, headline, blurb, topblurb, gradient2, gradient3 } = heroStyles({
    textAlign,
    screenPseudo: {
      md: "md",
      lg: "lg",
      xl: "xl",
      "2xl": "2xl",
    },
    headlineFont,
    blurbFont,
  });
  return (
    <section className={root()} {...storyblokEditable(blok)}>
      {(blok.headline || blok.blurb) && (
        <div className={headline()}>
          {blok.headline && (
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 mt-8">
              {" "}
              <FormatHeadline title={blok.headline} />
            </h1>
          )}
          {blok.blurb && <p className={topblurb()}>{blok.blurb}</p>}
        </div>
      )}
      <div className="absolute inset-0 -z-[1] max-md:h-96">
        <div className="hidden md:block">
          <Image
            alt={blok.background.alt}
            src={blok.background.filename}
            fill
            priority
            sizes="100vw"
            className="50vh object-cover"
          />
          {/* <div className={gradient()} /> */}
          {/* <div className={gradient2()} /> */}
          <div className={gradient3()} />
        </div>

        <div className="relative h-2/5 w-full md:hidden">
          <Image
            alt={blok.background.alt}
            src={blok.background.filename}
            fill
            priority
            className="absolute inset-0 h-full object-cover"
          />
        </div>
      </div>
      {blok.blurb && <p className={blurb()}>{blok.blurb}</p>}
    </section>
  );
}
