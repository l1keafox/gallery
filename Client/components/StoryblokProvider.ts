"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import { config } from "@/config";
import { PageBlock } from "./storyBloks/PageBlock";
import { Hero } from "@/components/storyBloks/Hero";
import { SkillSetsBlock } from "./storyBloks/SkillSetsBlock";
import { MessageMe } from "./storyBloks/MessageMe";
import { SplitImage } from "./storyBloks/SplitImage";
import { FourWords } from "./storyBloks/FourWords";
import { FloatMenu } from "./storyBloks/FloatMenu";
import { TopNavBar } from "./storyBloks/TopNavBar";
import { TopEmptySpace } from "./storyBloks/TopEmptySpace";
import { HalfImageText } from "./storyBloks/HalfImageText";
import { Featured } from "./storyBloks/blog/Featured";
import { NavigatePagination } from "./storyBloks/blog/NavigatePagination";
import { Text } from "./storyBloks/Text";

import {
  ContactMe,
  HalfAndHalf,
  Share,
  CardCarousel,
  Project,
  ImageBlock,
  Banner,
  Headline,
  RowBlock,
  RowImages,
  StyledLink,
  EmptySpace,
  ImageBackground,
  SolidBackground,
  RowText,
} from "./storyBloks";

const components = {
  Banner,
  ImageBackground,
  SolidBackground,
  Share,
  HalfAndHalf,
  RowText,
  Image: ImageBlock,
  RowImages,
  Headline,
  Project,
  Metadata: PageBlock,
  StyledLink,
  EmptySpace,
  Page: PageBlock,
  Row: RowBlock,
  page: PageBlock,
  Hero: Hero,
  DisplayProjects: CardCarousel,
  CardCarousel,
  SkillSets: SkillSetsBlock,
  Skillsets: SkillSetsBlock,
  TopEmptySpace: TopEmptySpace,
  MessageMe: MessageMe,
  SplitImage: SplitImage,
  ContactMe,
  FourWords: FourWords,
  FloatMenu: FloatMenu,
  TopNavBar: TopNavBar,
  HalfImageText: HalfImageText,
  Featured: Featured,
  NavigatePagination: NavigatePagination,
  Text: Text,
};

storyblokInit({
  accessToken: config.storyblok.accessToken,
  use: [apiPlugin],
  components,
});

export interface StoryblokProviderProps {
  children: JSX.Element;
}

export function StoryblokProvider({ children }: StoryblokProviderProps) {
  return children;
}
