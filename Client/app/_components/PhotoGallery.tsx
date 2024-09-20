"use client";
import { useEffect, useState, useRef } from "react";
import { InfinitePhotos } from "./InfinitePhotos";
import { StoryblokAsset } from "@/helpers/storyblok";
import { getImagesByPage } from "@/actions/fetchStoryblok";
import { Entertainer } from "@/components/ui/Entertainer";

export const GALLERY_PER_PAGE = 15;
export interface PhotoGalleryProps {
  startingAssets: StoryblokAsset[];
}

export function PhotoGallery({ startingAssets }: PhotoGalleryProps) {
  const [assets, setAssets] = useState(startingAssets ?? []);
  const [loadingAssets, setLoadingAssets] = useState(false); // This toggles loading icon.
  const pageCount = useRef(1);

  const loadMore = async () => {
    setLoadingAssets(true);
    pageCount.current++;
    const newImages = await getImagesByPage(
      pageCount.current,
      GALLERY_PER_PAGE,
    );
    setLoadingAssets(false);
    if (newImages.length === 0) {
      return false;
    }
    setAssets((preAssets) => [...preAssets, ...newImages]);
    return true;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(async (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          loadMore();
        }
      });
    });
    const obs = document.getElementById("infiniteObserver");
    if (obs) {
      observer.observe(obs);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <Entertainer className="relative mt-0 md:mt-2 px-0 md:px-0">
        <InfinitePhotos
          assets={assets}
          loadMore={loadMore}
          loadingAssets={loadingAssets}
        />
        <div id="infiniteObserver" className="absolute bottom-1/3" />
      </Entertainer>
    </main>
  );
}
