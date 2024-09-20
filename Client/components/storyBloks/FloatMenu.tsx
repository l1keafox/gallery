import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";
import { storyblokPaletteMap } from "@/components/Palette";
import { twMerge } from "tailwind-merge";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface FloatMenuBlokData extends SbBlokData {
  options: {
    text: string;
    link: string;
  }[];
  color: {
    value: string;
  };
}

export interface FloatMenuProps {
  blok: FloatMenuBlokData;
}

export function FloatMenu({ blok }: FloatMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <DropdownMenu.Root {...storyblokEditable(blok)}>
      <DropdownMenu.Trigger asChild>
        <button
          className={twMerge(
            `fixed top-4 right-4 z-[11] `,
            storyblokPaletteMap[blok.color.value],
          )}
        >
          <GiHamburgerMenu
            onClick={() => setMenuOpen(!menuOpen)}
            className="h-8 w-8 hover:text-black hover:bg-white"
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-[11] min-w-56 bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          {/* <DropdownMenu.Item
              className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
              disabled
            >
              Alternative Versions
            </DropdownMenu.Item> */}
          {blok.options.map((option) => {
            return (
              <DropdownMenu.Item
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                key={option.text}
              >
                <Link href={option.link} className="p-2">
                  {option.text}
                </Link>
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
