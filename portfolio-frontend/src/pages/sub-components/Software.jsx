import { MagicCard } from "../../components/magicui/magic-card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyApps = () => {
  const [apps, setApps] = useState([]);

  // Fetch the apps
  const getMyApps = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/software/getallapplication",
        { withCredentials: true }
      );
      setApps(data.softwareApplications);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getMyApps();
  }, []);

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1 className="text-tubeLight-effect font-bold text-[1.5rem] sm:text-[2.50rem] md:text-[3rem] lg:text-[3rem] mx-auto w-fit">
        Softwares
      </h1>

      {/* Horizontal Scrolling Container */}
      <div className="relative w-full overflow-hidden">
        <div className="scroll-container flex gap-4">
          {apps.map((element, index) => (
            <MagicCard
              className="h-fit min-w-[150px] p-5 flex flex-col justify-center items-center"
              key={`${element._id}-${index}`}
            >
              <img
                src={element.svg && element.svg.url}
                alt="skill"
                className="h-6 sm:h-10 w-auto"
              />
              <p className="text-muted-foreground text-[10px] text-center">
                {element.name}
              </p>
            </MagicCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyApps;
