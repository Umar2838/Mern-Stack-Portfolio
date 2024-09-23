import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BoxReveal from '../../components/magicui/box-reveal'
import WordRotate from '../../components/magicui/word-rotate'
import { Link } from 'react-router-dom' 
import { Button } from "@/components/ui/button";
import { CoolMode } from "@/components/magicui/cool-mode";
import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
const Hero = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/me/portfolio",
        { withCredentials: true }
      )
      setUser(data.user)
    }
    getMyProfile()
  }, [])

  const highlightText = (text) => {
    if (!text) return null
    return text.split(/(Full Stack Developer|Mobile App Developer)/gi).map((part, index) => {
      if (part.toLowerCase() === 'full stack developer' || part.toLowerCase() === 'mobile app developer') {
        return (
          <span key={index} className="font-bold text-[#5046e6]">
            {part}
          </span>
        )
      }
      return part
    })
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>
        <p>Online</p>
      </div>
      <div className="h-full w-full max-w-[32rem] items-center justify-center overflow-hidden pt-4">
        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <p className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] 
      md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] ">
            Eloo! I am 
            <span className="text-[#5046e6] font-semibold"> {user.fullName}.</span>
          </p>
        </BoxReveal>
        
        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <WordRotate
className="text-tubeLight-effect overflow-x-hidden text-[1rem] 
      sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] tracking-[3px] font-semibold "
words={["Full Stack Developer","Mobile App Devloper"]}
/> 
        </BoxReveal>
    
        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <h2 className="mt-[.5rem] text-[1rem]">
            {highlightText(user.aboutMe)}
          </h2>
        </BoxReveal>

   {/* social Link */}
   <BoxReveal boxColor={"#5046e6"} duration={0.5}>

   <div className="w-fit px-[30px] py-2 bg-slate-50 rounded-[20px] flex gap-5 
      items-center mt-4">
        <Link to={user.instagramURL} target="_blank">
          <Instagram className="text-pink-500 w-7 h-7" />
        </Link>
        <Link to={user.facebookURL} target="_blank">
          <Facebook className="text-blue-800 w-7 h-7" />
        </Link>
        <Link to={user.linkedInURL} target="_blank">
          <Linkedin className="text-sky-500 w-7 h-7" />
        </Link>
        <Link to={user.twitterURL} target="_blank">
          <Twitter className="text-blue-800 w-7 h-7" />
        </Link>
      </div>
        </BoxReveal>
        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <div className="mt-2 flex gap-3" >
          <div className="relative justify-center">
      <CoolMode>
        <Link to={user.githubURL} target="_blank" ><Button className="rounded-[30px] flex items-center gap-2 flex-row" ><span><Github/></span><span>Github</span></Button></Link>
      </CoolMode>
    </div>
    <div className="relative justify-center">
      <CoolMode>
        <Link to={user.resume && user.resume.url} target="_blank" ><Button className="rounded-[30px] flex items-center gap-2 flex-row" ><span><ExternalLink/></span><span>Resume</span></Button></Link>
      </CoolMode>
    </div>
          </div>
</BoxReveal>
        </div>

    </div>
  )
}

export default Hero
