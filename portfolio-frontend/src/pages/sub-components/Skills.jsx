import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import IconCloud from "@/components/magicui/icon-cloud";
import { MagicCard } from "@/components/magicui/magic-card";

const slugs = [
  "javascript",
  "java",
  "react",
  "flutter",
  "android",
  "c",
  "cplusplus",
  "tailwindcss",
  "html5",
  "css3",
  "bootstrap",
  "nodedotjs",
  "mysql",
  "firebase",
  "git",
  "androidstudio",
  "figma",
  "vitejs",
  "python",
  "anaconda",
  "mongodb",
  "express",
];

const Skills = () => {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/skill/getallskill",
        { withCredentials: true }
      );
      setSkills(data.skills);
    };
    getMySkills();
  }, []);
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
       
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] font-bold mx-auto w-fit">
        SKILLS
      </h1>
      <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg mx-auto px-20   ">
      <IconCloud iconSlugs={slugs} />
    </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-2 gap-4">
        {skills &&
          skills.map((element) => (
            <MagicCard
              className="cursor-pointer h-fit p-5 flex flex-col justify-center items-center gap-3 shadow-2xl "
              key={element._id}
            >
              <img
                src={element.svg && element.svg.url}
                alt="skill"
                className="h-4 sm:h-12 w-auto"
              />
              <p className="text-muted-foreground text-center">
                {element.title}
              </p>
            </MagicCard>
          ))}
      </div>
     
    </div>
  );
};

export default Skills;
