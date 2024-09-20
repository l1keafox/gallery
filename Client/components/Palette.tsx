export interface PaletteProps {}

export const storyblokPaletteMap: { [key: string]: string } = {
  "#B61D22": "text-[#B61D22]",
  "#E12727": "text-[#E12727]",
  "#D1D3D4": "text-[#D1D3D4]",
  "#808285": "text-[#808285]",
  "#414042": "text-[#414042]",
  "#FFF": "text-[#FFF]",
  "#000": "text-[#000]",
};

export function Palette({}: PaletteProps) {
  return (
    <>
      <h1>Palette</h1>
    </>
  );
}

// import { Fragment } from "react";

// export interface TextWithEmphasisProps {
//   text: string;
//   emphasisClassName: string;
// }

/**
 * Replaces all instances of text wrapped in curly braces with span elements styled with the provided class name
 * @prop text - text to render, wrap portions of text in curly braces to apply emphasis, nesting is not supported
 * @prop emphasisClassName - class name to apply to emphasis text spans
 * @returns Array of React Fragments containing text with emphasis spans interspersed
 * @example <TextWithEmphasis text="This is {emphasized} text" emphasisClassName="text-tsred" />
 */
// export function TextWithEmphasis({ text, emphasisClassName }: TextWithEmphasisProps) {
//   const emphasisText = text.matchAll(/(?<=\{).*?(?=\})/g);
//   return text.split(/\{.*?\}/g).map((text, idx) => {
//     const emphasis = emphasisText.next();
//     return (
//       <Fragment key={idx}>
//         {text}
//         {emphasis.value && <span className={emphasisClassName}>{emphasis.value}</span>}
//       </Fragment>
//     );
//   });
// }

/**
 * in storyblok we use storyblok's color palette app plugin, and it takes in an array of hex numbers: ["#E12727","#B61D22","#D1D3D4","#808285","#414042","#FFF","#000"] , with a default of #FFF
 * "If you use string interpolation or concatenate partial class names together, Tailwind will not find them and therefore will not generate the corresponding CSS:" - tailwind docs
 */
