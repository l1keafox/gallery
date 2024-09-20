import React from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { Slot } from "@/helpers/Slot";

const EntertainerStyles = tv(
  {
    slots: {
      root: "mx-auto px-4 max-w-screen-2xl",
    },
    variants: {
      screenPseudo: {
        md: {
          root: "px-6",
        },
        lg: {
          root: "px-8",
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

export interface EntertainerProps {
  children?: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

const Entertainer = React.forwardRef<HTMLDivElement, EntertainerProps>(
  ({ children, asChild, className, ...props }, ref) => {
    const { root } = EntertainerStyles({
      screenPseudo: {
        md: "md",
        lg: "lg",
        xl: "xl",
        "2xl": "2xl",
      },
    });
    const Comp = asChild ? Slot : "div";
    return (
      <Comp className={twMerge(root(), className)} {...props} ref={ref}>
        {children}
      </Comp>
    );
  },
);

Entertainer.displayName = "Entertainer";

export { Entertainer };
