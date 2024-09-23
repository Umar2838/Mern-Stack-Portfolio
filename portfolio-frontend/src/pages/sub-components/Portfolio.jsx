import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MagicCard } from '@/components/magicui/magic-card';
import NumberTicker from '@/components/magicui/number-ticker';
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useNavigate } from 'react-router-dom';
const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const portfolioRef = useRef(null);

  useEffect(() => {
    const getPortfolio = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:4000/api/v1/project/getallproject',
          { withCredentials: true }
        );
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    getPortfolio();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5, // Adjust this value based on when you want the animation to start
      }
    );

    if (portfolioRef.current) {
      observer.observe(portfolioRef.current);
    }

    return () => {
      if (portfolioRef.current) {
        observer.unobserve(portfolioRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px]
          mx-auto w-fit font-bold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          <span className="text-tubeLight-effect font-bold">PORTFOLIO</span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-bold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY <span className="text-tubeLight-effect font-bold">WORK</span>
        </h1>
      </div>

      <div
        ref={portfolioRef}
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 mx-2 gap-5"
      >
        <MagicCard className="p-5">
          <p className="whitespace-pre-wrap text-4xl font-medium tracking-tighter text-black dark:text-white">
            {isVisible && <NumberTicker value={projects.length} />}+
          </p>
          <h1>Completed Projects</h1>
        </MagicCard>

        <MagicCard className="p-5">
          <p className="whitespace-pre-wrap text-4xl font-medium tracking-tighter text-black dark:text-white">
            {isVisible && <NumberTicker value={5} />}+
          </p>
          <h1>Happy Clients</h1>
        </MagicCard>

        <MagicCard className="p-5">
          <p className="whitespace-pre-wrap text-4xl font-medium tracking-tighter text-black dark:text-white">
            {isVisible && <NumberTicker value={1} />}+
          </p>
          <h1>Years of Experience</h1>
        </MagicCard>
        <MagicCard className="p-5">
          <p className="whitespace-pre-wrap text-4xl font-medium tracking-tighter text-black dark:text-white">
            {isVisible && <NumberTicker value={4} />}+
          </p>
          <h1>Live Project</h1>
        </MagicCard>
      </div>

      <DragCards projects={projects} />
    </div>
  );
};

const DragCards = ({ projects }) => {
  const containerRef = useRef(null);

  return (
    <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-neutral-950">
      <h2 className="relative z-0 text-[151vw] font-black text-neutral-800 md:text-[160px]">
      </h2>
      <div className="absolute inset-0 z-10" ref={containerRef}>
        {projects.map((project, index) => (
          <Card
            key={project._id} 
            containerRef={containerRef}
            src={project.projectBanner.url}
            alt={`Project ${index + 1}`}
            rotate={`${(index + 1) * 6}deg`}
            top={`${20 + index * 5}%`}
            left={`${15 + index * 10}%`}
            className="w-36 md:w-56"
            projectId={project._id} 
          />
        ))}
      </div>
    </section>
  );
};



const Card = ({ containerRef, src, alt, top, left, rotate, className, projectId }) => {
  const [zIndex, setZIndex] = useState(0);
  const navigate = useNavigate(); // Hook for navigation

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  const handleClick = () => {
    navigate(`/project/${projectId}`); 
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      onDoubleClick={handleClick} 
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        "drag-elements absolute w-48 bg-[#6366f1] p-1 pb-4 cursor-pointer", // Add cursor-pointer for visual feedback
        className
      )}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
    />
  );
};

export default Portfolio;
