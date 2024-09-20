import { Slot } from "@/helpers/Slot";
import { tv } from "tailwind-variants";
import { forwardRef } from "react";
import { StoryblokRounded, StoryblokColor } from "@/helpers/storyblok";

const ButtonStyles = tv(
  {
    slots: {
      root: "py-2 m-1 px-2 text-lg outline outline-2 outline-offset-2 font-black border-2 border-solid hover:outline-[5px] hover:-outline-offset-1 peer-hover:outline-4 peer-hover:outline-offset-0",
    },
    variants: {
      size: {
        medium: {
          root: "w-32",
        },
        large: {
          root: "w-48",
        },
        xLarge: {
          root: "w-64",
        },
      },
      rounded: {
        none: {
          root: "rounded-none",
        },
        small: {
          root: "rounded-sm",
        },
        medium: {
          root: "rounded-md",
        },
        large: {
          root: "rounded-lg",
        },
        xlarge: {
          root: "rounded-xl",
        },
        "2xlarge": {
          root: "rounded-2xl",
        },
        "3xlarge": {
          root: "rounded-3xl",
        },
        full: {
          root: "rounded-full",
        },
      },
      color: {
        "#FFFFE0": {
          root: "bg-[#FFFFE0] border-gray-3 text-gray-3 hover:text-gray-5 outline-gray-3 hover:bg-[#FFD700]",
        },
        "#FFD700": {
          root: "bg-[#FFD700] hover:bg-[#FFFFE0] border-black hover:border-gray-3 text-black hover:text-gray-3 outline-black hover:outline-gray-3",
        },
        "#FFA07A": {
          root: "bg-[#FFA07A] hover:bg-[#FF4500] border-black hover:border-gray-3 text-black hover:text-gray-3 outline-black hover:outline-gray-3",
        },
        "#FF4500": {
          root: "bg-[#FF4500] hover:bg-[#FFA07A] border-black hover:border-gray-3 text-black hover:text-gray-3 outline-black hover:outline-gray-3",
        },
        "#90EE90": {
          root: "bg-[#90EE90] hover:bg-[#006400] border-black hover:border-gray-3 text-black hover:text-gray-1 outline-black hover:outline-gray-3",
        },
        "#006400": {
          root: "bg-[#006400] hover:bg-[#90EE90] border-black hover:border-gray-3 text-white hover:text-gray-3 outline-black hover:outline-gray-3",
        },
        "#9370DB": {
          root: "bg-[#9370DB] hover:bg-[#4B0082] border-black hover:border-gray-3 text-black hover:text-gray-1 outline-black hover:outline-gray-3",
        },
        "#4B0082": {
          root: "bg-[#4B0082] hover:bg-[#9370DB] border-black hover:border-gray-3 text-white hover:text-gray-5 outline-black hover:outline-gray-3",
        },
        "#0D47A1": {
          root: "bg-[#0D47A1] hover:bg-[#1E90FF] border-black hover:border-gray-3 text-white hover:text-gray-1 outline-black hover:outline-gray-3",
        },
        "#1E90FF": {
          root: "bg-[#1E90FF] hover:bg-[#0D47A1] border-black hover:border-gray-3 text-black hover:text-gray-1 outline-black hover:outline-gray-3",
        },
        "#E12727": {
          root: "bg-[#E12727] hover:bg-[#B61D22] border-black hover:border-gray-3 text-white hover:text-black outline-black hover:outline-gray-3",
        },
        "#B61D22": {
          root: "bg-[#B61D22] hover:bg-[#E12727] border-black hover:border-gray-3 text-white hover:text-gray-5 outline-black hover:outline-gray-3",
        },
        "#FFF": {
          root: "bg-[#FFF] border-black text-black outline-black",
        },
        "#D1D3D4": {
          root: "bg-[#D1D3D4] border-black text-black outline-black",
        },
        "#808285": {
          root: "bg-[#808285] border-black text-white outline-black",
        },
        "#414042": {
          root: "bg-[#414042] border-black text-white outline-black",
        },
        "#000": {
          root: "bg-[#000] border-black text-white outline-black",
        },
      },
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
export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  // type?: "button" | "submit" | "reset";
  size?: "medium" | "large" | "xLarge";
  rounded?: StoryblokRounded;
  color?: StoryblokColor;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size = "medium",
      asChild,
      color = "#FFFFE0",
      rounded = "none",
      className,
      ...props
    },
    ref,
  ) => {
    const { root } = ButtonStyles({
      size,
      color,
      rounded,
      screenPseudo: {
        md: "md",
        lg: "lg",
        xl: "xl",
        "2xl": "2xl",
      },
    });

    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={root({ className })} {...props} ref={ref}>
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button };
