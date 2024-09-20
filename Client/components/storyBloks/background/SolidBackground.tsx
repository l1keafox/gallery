import { tv } from "tailwind-variants";
import { StoryblokColor } from "@/helpers/storyblok";
import { storyblokEditable } from "@storyblok/react/rsc";

const SolidBackgroundStyles = tv({
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
    color: {
      "#FFFFE0": {
        root: "bg-[#FFFFE0]",
      },
      "#FFD700": {
        root: "bg-[#FFD700]",
      },
      "#FFA07A": {
        root: "bg-[#FFA07A]",
      },
      "#FF4500": {
        root: "bg-[#FF4500]",
      },
      "#90EE90": {
        root: "bg-[#90EE90]",
      },
      "#006400": {
        root: "bg-[#006400]",
      },
      "#9370DB": {
        root: "bg-[#9370DB]",
      },
      "#4B0082": {
        root: "bg-[#4B0082]",
      },
      "#0D47A1": {
        root: "bg-[#0D47A1]",
      },
      "#1E90FF": {
        root: "bg-[#1E90FF]",
      },
      "#E12727": {
        root: "bg-[#E12727]",
      },
      "#B61D22": {
        root: "bg-[#B61D22]",
      },
      "#FFF": {
        root: "bg-[#FFF]",
      },
      "#D1D3D4": {
        root: "bg-[#D1D3D4]",
      },
      "#808285": {
        root: "bg-[#808285]",
      },
      "#414042": {
        root: "bg-[#414042]",
      },
      "#000": {
        root: "bg-[#000]",
      },
    },
  },
  slots: {
    root: "top-0 fixed w-screen h-screen bg-cover bg-no-repeat bg-center ",
  },
});

export interface SolidBackgroundProps {
  blok: {
    color: {
      value: StoryblokColor;
    };
    opacity: {
      value: 100 | 90 | 80 | 70 | 60 | 50 | 40 | 30 | 20 | 10 | 0 | undefined;
    };
  };
  className?: string;
}

export function SolidBackground({ blok, className }: SolidBackgroundProps) {
  const { root } = SolidBackgroundStyles({
    color: blok.color?.value ?? "#FFF",
    opacity: blok.opacity?.value ?? 100,
  });
  return (
    <div className={root({ className })} {...storyblokEditable(blok)}></div>
  );
}
