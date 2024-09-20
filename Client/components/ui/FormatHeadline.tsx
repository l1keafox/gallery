import { tv } from "tailwind-variants";
import { cn } from "@/helpers/csMerge";
import React, { ForwardedRef } from "react";
import { Slot } from "@/helpers/Slot";

export interface FormatHeadlineProps {
  title: string;
  className?: string;
}

const FormatHeadline = React.forwardRef<HTMLDivElement, FormatHeadlineProps>(
  ({ title, className }, ref: ForwardedRef<HTMLDivElement>) => {
    const titleArr = title?.split(" ") ?? [];

    return (
      <Headline ref={ref} className={cn(["flex flex-col", className])}>
        <HeadlineSolidWord className="text-black">
          {titleArr[0]}{" "}
        </HeadlineSolidWord>
        <HeadlineOutlineWord>
          {titleArr.splice(1).join(" ")}
        </HeadlineOutlineWord>
      </Headline>
    );
  },
);
FormatHeadline.displayName = "FormatHeadline";

export interface HeadlineSolidWordProps {
  children?: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

const HeadlineSolidWord = React.forwardRef<
  HTMLSpanElement,
  HeadlineSolidWordProps
>(
  (
    { children, className, asChild, ...props },
    ref: ForwardedRef<HTMLSpanElement>,
  ) => {
    const Comp = asChild ? Slot : "span";
    return (
      <Comp className={cn(["", className])} {...props} ref={ref}>
        {children}
      </Comp>
    );
  },
);
HeadlineSolidWord.displayName = "HeadlineSolidWord";

export interface HeadlineOutlineWordProps {
  children?: React.ReactNode;
  className?: string;
  asChild?: boolean;
  color?: "black" | "white" | "none";
}

const HeadlineOutlineStyles = tv({
  variants: {
    color: {
      black: {
        root: "[-webkit-text-stroke:2px_black]",
      },
      white: {
        root: "[-webkit-text-stroke:2px_white]",
      },
      none: {
        root: "",
      },
    },
  },
  slots: {
    root: "text-transparent",
  },
});

const HeadlineOutlineWord = React.forwardRef<
  HTMLSpanElement,
  HeadlineOutlineWordProps
>(
  (
    { children, className, asChild, color = "black", ...props },
    ref: ForwardedRef<HTMLSpanElement>,
  ) => {
    const { root } = HeadlineOutlineStyles({
      color,
    });
    const Comp = asChild ? Slot : "span";
    return (
      <Comp className={root({ className })} {...props} ref={ref}>
        {children}
      </Comp>
    );
  },
);
HeadlineOutlineWord.displayName = "HeadlineOutlineWord";

export interface HeadlineProps {
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
}
const Headline = React.forwardRef<HTMLDivElement, HeadlineProps>(
  (
    { children, className, asChild, ...props },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp className={cn(["flex flex-col", className])} {...props} ref={ref}>
        {children}
      </Comp>
    );
  },
);
Headline.displayName = "Headline";

export { HeadlineSolidWord, FormatHeadline, HeadlineOutlineWord, Headline };
