"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { MdClose as X } from "react-icons/md";
import { cn } from "../../helpers/csMerge";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 mx-auto gap-4 border bg-gray-1 p-2 md:p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-2 md:right-4 top-2 md:top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col text-center sm:text-left", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "next-share";
import { FaFacebook, FaTwitter, FaLinkedin, FaLink } from "react-icons/fa";
import { ShareDialogProps } from "../storyBloks/Share";

// Set to default so it can be lazy loaded with ssr:false
export default function ShareDialog({ blok, children }: ShareDialogProps) {
  // this is a client component

  const url = window?.location?.href ?? "";

  const { quote, hashtag } = blok;
  const copyToClipboard = () => {
    alert("Link copied to clipboard!");
    navigator.clipboard.writeText(url);
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="flex flex-col gap-2">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
        </DialogHeader>
        {/* text-sm text-muted-foreground */}
        <DialogDescription>
          <p className="ml-2 mb-2">Share &quot;{quote}&quot;</p>
          <div className="flex w-full items-center justify-center gap-2 text-xs md:rounded-lg border-y-2 md:border-2 border-solid border-black px-4 py-2 text-GreyScale-grey">
            <button
              onClick={copyToClipboard}
              className="flex h-8 w-8 items-center justify-center rounded shadow-lg bg-white hover:bg-black hover:text-white"
            >
              <FaLink className="h-6 w-6" />
            </button>
            {url}
          </div>
        </DialogDescription>
        <DialogFooter className="text-lg font-semibold leading-none tracking-tight flex items-center flex-row gap-2">
          <h3 className="">Click to share </h3>
          <TwitterShareButton url={url}>
            <div className="flex h-10 w-10 items-center justify-center rounded shadow-lg bg-white hover:bg-black hover:text-white">
              <FaTwitter className="h-8 w-8" />
            </div>
          </TwitterShareButton>

          <FacebookShareButton url={url} quote={quote} hashtag={hashtag}>
            <div className="flex h-10 w-10 items-center justify-center rounded shadow-lg bg-white hover:bg-black hover:text-white">
              <FaFacebook className="h-8 w-8" />
            </div>
          </FacebookShareButton>

          <LinkedinShareButton url={url}>
            <div className="flex h-10 w-10 items-center justify-center rounded shadow-lg bg-white hover:bg-black hover:text-white">
              <FaLinkedin className="h-8 w-8" />
            </div>
          </LinkedinShareButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
