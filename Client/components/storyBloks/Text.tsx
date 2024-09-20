import {
  render,
  NODE_HEADING,
  MARK_LINK,
  NODE_PARAGRAPH,
} from "storyblok-rich-text-react-renderer";
import { SbBlokData, StoryblokComponent } from "@storyblok/react/rsc";
import Link from "next/link";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

export interface RichTextBlokData extends SbBlokData {
  text: {
    type: string;
    content: any[];
  };
}
import { StoryblokFonts } from "@/helpers/storyblok";

interface TextBlokData extends SbBlokData {
  text: RichTextBlokData;
  justify: "left" | "center" | "right";
  textJustify: "left" | "center" | "right";
  font: StoryblokFonts;
  sideBody: any[];
}

export interface TextProps {
  blok: TextBlokData;
}

const TextStyles = tv({
  slots: {
    root: "w-full h-full lg:flex md:mx-auto px-2 md:px-6 lg:px-8 md:max-w-screen-2xl",
    sideRoot: "w-full mt-4 md:mt-6 lg:mt-0 flex flex-row justify-center",
  },
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
    textJustify: {
      left: {
        root: "text-left",
      },
      center: {
        root: "text-center",
      },
      right: {
        root: "text-right",
      },
    },
    justify: {
      left: {
        root: "justify-start",
      },
      center: {
        root: "justify-center",
        sideRoot: "hidden",
      },
      right: {
        root: "justify-start flex-row-reverse", //
      },
    },
  },
});

export function Text({ blok }: TextProps) {
  const { root, sideRoot } = TextStyles({
    justify: blok.justify,
    textJustify: blok.textJustify,
    font: blok.font,
  });
  return (
    <div className={root()}>
      <RenderRichText className="max-w-screen-md" text={blok.text} />
      {blok.sideBody?.length > 0 && (
        <div className={sideRoot()}>
          {blok.sideBody?.map((nestedBlok, idx) => (
            <StoryblokComponent
              key={nestedBlok._uid ?? idx}
              blok={nestedBlok}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export interface RenderRichTextProps {
  text: RichTextBlokData;
  className?: string;
}

export function RenderRichText({ className, text }: RenderRichTextProps) {
  return (
    <div className={twMerge("", className)}>
      {render(text, {
        defaultBlokResolver: (name, props) => {
          const blok = { ...props, component: name };
          return <StoryblokComponent blok={blok} key={props._uid} />;
        },
        markResolvers: {
          [MARK_LINK]: (children, props) => {
            const { linktype, href, target } = props;
            if (linktype === "email") {
              // Email links: add `mailto:` scheme and map to <a>
              return (
                <a
                  className="underline text-blue-700 hover:text-blue-400"
                  href={`mailto:${href}`}
                >
                  {children}
                </a>
              );
            }
            if (href?.match(/^(https?:)?\/\//)) {
              // External links: map to <a>
              return (
                <a
                  className="underline text-blue-700 hover:text-blue-400"
                  href={href}
                  target={target}
                >
                  {children}
                </a>
              );
            }
            // Internal links: map to <Link>
            return (
              <Link
                className="underline text-blue-700 hover:text-blue-400"
                href={href ?? ""}
              >
                {children}
              </Link>
            );
          },
        },
        nodeResolvers: {
          [NODE_PARAGRAPH]: (children) => {
            return <p className="text-md mb-2">{children}</p>;
          },
          [NODE_HEADING]: (children, props) => {
            if (props.level === 1) {
              return <h1 className="text-5xl mb-2">{children}</h1>;
            } else if (props.level === 2) {
              return <h2 className="text-4xl mb-2">{children}</h2>;
            } else if (props.level === 3) {
              return <h3 className="text-3xl mb-2">{children}</h3>;
            } else if (props.level === 4) {
              return <h4 className="text-2xl mb-2">{children}</h4>;
            } else if (props.level === 5) {
              return <h5 className="text-xl mb-2">{children}</h5>;
            } else if (props.level === 6) {
              return <h6 className="text-lg mb-2">{children}</h6>;
            } else {
              return <></>;
            }
          },
        },
      })}
    </div>
  );
}
