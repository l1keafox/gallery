import { MdEmail, MdLocalPhone } from "react-icons/md";
import { GrGithub } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa6";
import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import { tv } from "tailwind-variants";

export interface ContactMeBlokData extends SbBlokData {
  email: string;
  phone: string;
  github: string;
  linkedIn: string;
}

export interface ContactMeProps {
  blok: ContactMeBlokData;
}

const ContactMeStyles = tv(
  {
    slots: {
      root: "w-full text-sm font-roboto  py-4 bg-gray-1 flex items-center justify-center flex-col",
      link: "flex items-center flex-col text-center",
    },
    variants: {
      screenPseudo: {
        md: {
          root: "text-lg",
          link: "flex-row",
        },
        lg: {
          root: "",
          link: "",
        },
        xl: {
          root: "min-h-28",
        },
        "2xl": {},
      },
    },
  },
  {
    responsiveVariants: ["md", "lg", "xl", "2xl"],
  },
);

export function ContactMe({ blok }: ContactMeProps) {
  const { root, link } = ContactMeStyles({
    screenPseudo: {
      md: "md",
      lg: "lg",
      xl: "xl",
      "2xl": "2xl",
    },
  });

  return (
    <section className={root()} {...storyblokEditable(blok)}>
      {blok.email && (
        <a href={`mailto: ${blok.email}`} className={link()}>
          <MdEmail />
          <span className="ml-2">{blok.email}</span>{" "}
        </a>
      )}
      {blok.phone && (
        <a href={`tel:${blok.phone}`} className={link()}>
          <MdLocalPhone />
          <h2 className="ml-2">{blok.phone}</h2>
        </a>
      )}
      {blok.github && (
        <a href={blok.github} className={link()}>
          <GrGithub />
          <h2 className="ml-2">{blok.github}</h2>
        </a>
      )}

      {blok.linkedIn && (
        <a href={blok.linkedIn} className={link()}>
          <FaLinkedin />
          <h2 className="ml-2">{blok.linkedIn}</h2>
        </a>
      )}
      <h3>
        Powered by{" "}
        <a href="https://raymondlewis.dev" className="text-red-500">
          Raymond Lewis
        </a>{" "}
        and{" "}
        <a href="https://www.storyblok.com" className="text-blue-500">
          Storyblok
        </a>
      </h3>
    </section>
  );
}
