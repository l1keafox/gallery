import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import { Entertainer } from "../ui/Entertainer";

interface SkillSetsBlockBlokData extends SbBlokData {
  skills: string;
}

export interface SkillSetsBlockProps {
  blok: SkillSetsBlockBlokData;
}

export function SkillSetsBlock({ blok }: SkillSetsBlockProps) {
  const skillArray = blok.skills.split(",");
  return (
    <Entertainer
      className="min-h-[150px] text-xl mb-4 md:mb-8 lg:mb-16 mx-auto"
      {...storyblokEditable(blok)}
    >
      <div className="w-full min-h-[150px] border-2 border-dashed border-gray-3  flex flex-wrap flex-row items-center justify-center">
        {skillArray.map((skill) => (
          <span className="m-2" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </Entertainer>
  );
}
