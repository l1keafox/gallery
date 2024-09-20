import React from "react";
import { tv } from "tailwind-variants";
import { Slot } from "@/helpers/Slot";

const ContainerStyles = tv(
  {
    slots: {
      root: "container px-4 mx-auto",
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

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const { root } = ContainerStyles({
      screenPseudo: {
        md: "md",
        lg: "lg",
        xl: "xl",
        "2xl": "2xl",
      },
    });
    const Comp = asChild ? Slot : "div";
    return (
      <Comp className={root({ className })} {...props} ref={ref}>
        {children}
      </Comp>
    );
  },
);

Container.displayName = "Container";

export { Container };
