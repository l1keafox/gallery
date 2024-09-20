import {
  StoryblokComponent,
  SbBlokData,
  storyblokEditable,
} from "@storyblok/react/rsc";
import { StoryImage } from "../StoryImage";

export interface PageBlokData extends SbBlokData {
  body: any[];
  background: any[];
}

export interface PageProps {
  blok: PageBlokData;
  paginationPage: any;
}

export function PageBlock({ blok, paginationPage }: PageProps) {
  return (
    <div className="w-full h-full relative" {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok, idx) => (
        <StoryblokComponent
          key={nestedBlok._uid ?? idx}
          blok={nestedBlok}
          paginationPage={paginationPage}
        />
      ))}

      {/* This is adding the background blocks. */}
      {blok.background?.map((nestedBlok, idx) => (
        <StoryblokComponent
          key={nestedBlok._uid ?? idx}
          blok={nestedBlok}
          className="z-[-10]"
        />
      ))}
    </div>
  );
}
