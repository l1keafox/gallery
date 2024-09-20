"use client";

import { Entertainer } from "../ui/Entertainer";
import { StoryblokPalette } from "@/helpers/storyblok";
import dynamic from "next/dynamic";
import { Button } from "../ui/Button";
import { FaLink } from "react-icons/fa";
import { Suspense } from "react";
// dynamic no server side rendering.
const ShareDialog = dynamic(() => import("./../ui/Dialog"), { ssr: false });

export interface ShareDialogBlokData {
  hashtag: string;
  quote: string;
  buttonColor: StoryblokPalette;
}

export interface ShareDialogProps {
  blok: ShareDialogBlokData;
  children?: JSX.Element;
}

export function Share({ blok }: ShareDialogProps) {
  return (
    <Entertainer className="flex justify-between mb-2">
      <Suspense fallback={<div />}>
        <ShareDialog blok={blok}>
          <Button
            rounded="full"
            className="h-fit flex items-center justify-center gap-2"
            color={blok.buttonColor.value}
          >
            {" "}
            <FaLink className="h-6 w-6" /> Share
          </Button>
        </ShareDialog>
      </Suspense>
      <div />
    </Entertainer>
  );
}
