"use client";

import Image from "next/image";
import { HeroBlokData } from "../Hero";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { storyblokEditable } from "@storyblok/react/rsc";
import { tv } from "tailwind-variants";
import { StoryImage } from "../../StoryImage";

import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

export interface NavigatePaginationProps {
  blok: {
    title: string;
  };
  paginationPage: {
    pageContent: any[];
    pageCount: number;
    perPage: number;
    target: string;
  };
}

const NavigatePaginationStyles = tv({
  slots: {
    root: "max-w-screen-2xl mx-auto w-full lg:px-8 px-4 md:px-6 mb-4 md:mb-8 lg:mb-16",
  },
  variants: {},
});
export function NavigatePagination({
  blok,
  paginationPage,
}: NavigatePaginationProps) {
  const allBlogs = paginationPage.pageContent;
  const { pageCount } = paginationPage;
  const {} = blok;
  const { root } = NavigatePaginationStyles({});
  if (allBlogs.length === 0) {
    return <></>;
  }
  return (
    <section className={root()} {...storyblokEditable(blok)}>
      <div className="max-w-screen-md">
        <div className="flex justify-between flex-col md:flex-row w-full">
          <h1 className="uppercase text-5xl font-black mb-4 md:mb-6">
            {" "}
            {blok.title}{" "}
          </h1>
          <Controls pageCount={pageCount} />
        </div>
        <div className="flex flex-col gap-4">
          {allBlogs &&
            allBlogs.map((blog, idx) => {
              const Hero = blog.content.body.find(
                (blok: HeroBlokData) => blok.component === "Metadata",
              );
              if (idx === 0) {
                console.log(blog.content.body);
              }
              return (
                <Link
                  href={blog.full_slug}
                  className="h-36 group odd:bg-gray-50 gap-2 flex border-y-2 border-solid border-gray-3"
                  key={idx}
                >
                  <div className="w-3/12 md:w-1/4 aspect-video relative overflow-hidden">
                    {Hero?.images[0] && (
                      <StoryImage
                        src={Hero.images[0]}
                        alt={Hero.images[0].alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform inset-0 absolute top-0 left-0 w-full h-full"
                      />
                    )}
                  </div>
                  <div className="py-2 w-9/12 md:w-3/4 h-fill flex flex-col">
                    <h3 className="uppercase max-md:line-clamp-2 text-xl font-bold mb-2">
                      {Hero?.title}{" "}
                    </h3>
                    <h2 className="text-md line-clamp-2 md:line-clamp-3 line-wrap">
                      {Hero?.description}{" "}
                    </h2>
                    {/*
                     */}
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export interface ControlsProps {
  pageCount: number;
}

export function Controls({ pageCount }: ControlsProps) {
  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }
  const searchParams = useSearchParams();
  const paged: number = parseInt(searchParams.get("page") ?? "1");

  return (
    <div className="max-md:mb-2 flex h-fit gap-2">
      {/* here we need to add in two prev page and first page */}
      <Link
        replace={false}
        scroll={false}
        href={`/blog?page=1`}
        className="hover:bg-gray-1 text-black border-2 border-solid border-gray-3 h-10 w-10 flex items-center justify-center"
      >
        <FaAngleDoubleLeft />
      </Link>
      <Link
        href={`/blog?page=${paged - 1 > 0 ? paged - 1 : 1}`}
        replace={false}
        scroll={false}
        className="text-black hover:bg-gray-1 border-2 border-solid border-gray-3 h-10 w-10 flex items-center justify-center"
      >
        <FaAngleLeft />
      </Link>

      {pages &&
        pages.map((thisPage, idx) => {
          return (
            <Link
              key={idx}
              href={`/blog?page=${idx + 1}`}
              replace={false}
              scroll={false}
              className={`font-bold border-2 border-solid border-gray-3 h-10 w-10 flex items-center justify-center ${
                paged - 1 === idx
                  ? "bg-gray-3 text-white"
                  : "bg-white text-black hover:bg-gray-1 "
              } `}
            >
              {thisPage}
            </Link>
          );
        })}
      {/*  here we need to add in next page and last page */}
      <Link
        href={`/blog?page=${paged + 1 < pageCount ? paged + 1 : pageCount}`}
        replace={false}
        scroll={false}
        className="text-black hover:bg-gray-1 border-2 border-solid border-gray-3 h-10 w-10 flex items-center justify-center"
      >
        <FaAngleRight />
      </Link>
      <Link
        replace={false}
        scroll={false}
        href={`/blog?page=${pageCount}`}
        className="text-black hover:bg-gray-1 border-2 border-solid border-gray-3 h-10 w-10 flex items-center justify-center"
      >
        <FaAngleDoubleRight />
      </Link>
    </div>
  );
}
