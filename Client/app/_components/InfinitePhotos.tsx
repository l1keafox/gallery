"use client";
import { StoryblokAsset } from "@/helpers/storyblok";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { useState, useRef, MutableRefObject } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { useSwipe } from "@/helpers/hooks";

export interface InfinitePhotosProps {
  assets: StoryblokAsset[];
  loadMore: () => boolean | Promise<boolean>;
  loadingAssets: boolean;
}

export function InfinitePhotos({
  assets,
  loadMore,
  loadingAssets,
}: InfinitePhotosProps) {
  const columns: StoryblokAsset[][] = Array.from({ length: 3 }, () => []);
  const columnHeights: number[] = Array.from({ length: 3 }, () => 0);

  const columns2: StoryblokAsset[][] = Array.from({ length: 2 }, () => []);
  const columnHeights2: number[] = Array.from({ length: 2 }, () => 0);

  const [modalData, setModalData] = useState<StoryblokAsset | null>(null);
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const modalIndex = useRef(-1);
  const modalColumnIndex = useRef(-1);

  assets.forEach((asset) => {
    let shortestColumnIndex = 0;
    let shortestColumnHeight = columnHeights2[0];
    for (let i = 1; i < columnHeights2.length; i++) {
      if (columnHeights2[i] < shortestColumnHeight) {
        shortestColumnHeight = columnHeights2[i];
        shortestColumnIndex = i;
      }
    }

    const dimensionRegex = /(\d+)x(\d+)/;
    const match = asset.filename.match(dimensionRegex);

    if (match) {
      const parseX = Number(match[1]);
      const parseY = Number(match[2]);
      if (Number.isFinite(parseX) && Number.isFinite(parseY)) {
        columnHeights2[shortestColumnIndex] += parseY / parseX;
      }
    } else {
      columnHeights2[shortestColumnIndex] += 1;
    }
    columns2[shortestColumnIndex].push(asset);
  });
  assets.forEach((asset) => {
    let shortestColumnIndex = 0;
    let shortestColumnHeight = columnHeights[0];
    for (let i = 1; i < columnHeights.length; i++) {
      if (columnHeights[i] < shortestColumnHeight) {
        shortestColumnHeight = columnHeights[i];
        shortestColumnIndex = i;
      }
    }

    const dimensionRegex = /(\d+)x(\d+)/;
    const match = asset.filename.match(dimensionRegex);

    if (match) {
      const parseX = Number(match[1]);
      const parseY = Number(match[2]);
      if (Number.isFinite(parseX) && Number.isFinite(parseY)) {
        columnHeights[shortestColumnIndex] += parseY / parseX;
      }
    } else {
      columnHeights[shortestColumnIndex] += 1;
    }
    columns[shortestColumnIndex].push(asset);
  });

  const openModal = (idx: number, columnIndex?: number) => {
    if (columnIndex !== undefined) {
      modalIndex.current = idx;
      modalColumnIndex.current = columnIndex;
      setModalData(columns[columnIndex][idx]);
    } else {
      setModalData(assets[idx]);
    }
    modalRef.current?.showModal();
  };
  const openModal2 = (idx: number, columnIndex?: number) => {
    if (columnIndex !== undefined) {
      modalIndex.current = idx;
      modalColumnIndex.current = columnIndex;
      setModalData(columns2[columnIndex][idx]);
    } else {
      setModalData(assets[idx]);
    }
    modalRef.current?.showModal();
  };
  const closeModal: React.MouseEventHandler<
    HTMLButtonElement | HTMLDialogElement
  > = (e) => {
    const target = e.target as HTMLElement;
    if (target === modalRef.current || target.id === "closeBtn") {
      modalRef.current?.close();
      modalIndex.current = -1;
      modalColumnIndex.current = -1;
      setModalData(null);
    }
  };

  const nextImage = async () => {
    if (modalIndex.current < assets.length - 1) {
      modalIndex.current++;
    } else {
      const loadingMore = await loadMore();
      if (!loadingMore) {
        modalIndex.current = 0;
      }
    }
    setModalData(assets[modalIndex.current]);
  };
  const prevImage = () => {
    if (modalIndex.current > 0) {
      modalIndex.current--;
    } else {
      modalIndex.current = assets.length - 1;
    }
    setModalData(assets[modalIndex.current]);
  };

  return (
    <>
      <div className="flex w-full flex-row">
        {!assets.length && (
          <h2 className="absolute w-full text-center text-3xl font-bold uppercase">
            No images found.
          </h2>
        )}
        {columns.map((column, columnIndex) => (
          <div
            id={`column${columnIndex + 1}`}
            className={`hidden w-full px-2 lg:block lg:w-1/3 lg:first:px-2 lg:last:pl-2 lg:even:px-2`}
            key={columnIndex}
          >
            {column.map((asset, i) => (
              <ImageAsset
                onClick={() => openModal(i, columnIndex)}
                asset={asset}
                key={i}
                className={``}
              />
            ))}
          </div>
        ))}

        {columns2.map((column, columnIndex) => (
          <div
            id={`column${columnIndex + 1}`}
            className={`w-full flex flex-col lg:hidden md:first:px-2 md:last:pl-2 md:gap-2 `}
            key={columnIndex}
          >
            {column.map((asset, i) => (
              <ImageAsset
                onClick={() => openModal2(i, columnIndex)}
                asset={asset}
                key={i}
                className={``}
              />
            ))}
          </div>
        ))}
      </div>
      <ImageModal
        modalRef={modalRef}
        modalData={modalData}
        loadingAssets={loadingAssets}
        prevImage={prevImage}
        nextImage={nextImage}
        closeModal={closeModal}
      />
    </>
  );
}

interface ImageAssetProps {
  asset: StoryblokAsset;
  className?: string;
  onClick?: () => void;
}

function ImageAsset({ asset, className, onClick, ...props }: ImageAssetProps) {
  return (
    <button
      className={twMerge("w-full lg:mb-4", className)}
      {...props}
      onClick={onClick}
    >
      <Image
        src={asset.filename}
        className="h-full object-cover lg:shadow-md lg:rounded-xl"
        height={1024}
        width={1024}
        alt={asset.alt ?? "pic"}
      />
    </button>
  );
}

interface ImageModalProps {
  modalRef: MutableRefObject<HTMLDialogElement | null>;
  modalData: StoryblokAsset | null;
  closeModal: React.MouseEventHandler<HTMLButtonElement | HTMLDialogElement>;
  nextImage: () => void;
  prevImage: () => void;
  loadingAssets: boolean;
}

function ImageModal({
  modalRef,
  loadingAssets,
  modalData,
  nextImage,
  prevImage,
  closeModal,
}: ImageModalProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const nextSlide = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) {
      e.preventDefault();
    }
    nextImage();
  };

  const prevSlide = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) {
      e.preventDefault();
    }
    nextImage();
  };
  useSwipe(contentRef, { left: nextSlide, right: prevSlide });
  return (
    <dialog
      onClick={closeModal}
      ref={modalRef}
      className="fixed z-[39] overflow-visible backdrop:bg-black/80"
    >
      <div
        ref={contentRef}
        className="relative flex flex-col items-center lg:flex-row"
      >
        {modalData?.filename && (
          <Image
            src={modalData?.filename}
            height={800}
            width={800}
            className={`order-2 max-h-screen max-w-screen object-contain lg:order-none select-none bg-black ${
              isLoaded ? "" : "animate-pulse bg-black"
            } `}
            alt={modalData?.alt}
            onLoad={() => setIsLoaded(true)}
          />
        )}
        {loadingAssets && (
          <h3 className="bg-slate-300 py-2 px-4 animate-pulse rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            {" "}
            LOADING{" "}
          </h3>
        )}
        <button
          className="absolute size-8 rounded-full bg-blue-300/50 flex items-center justify-center top-1/2 -translate-y-1/2 left-1 md:left-4"
          onClick={prevImage}
        >
          <GrLinkPrevious className="size-6 text-black" />
        </button>
        <button
          className="absolute size-8 rounded-full bg-blue-300/50 flex items-center justify-center top-1/2 -translate-y-1/2 right-1 md:right-4"
          onClick={nextImage}
        >
          <GrLinkNext className="size-6 text-black" />
        </button>
      </div>
    </dialog>
  );
}
