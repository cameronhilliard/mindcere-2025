"use client"

import React from 'react'
import { useState, useEffect} from "react";
import * as motion from "motion/react-client"



const DailyComponent = () => {

  
  const [healthTip, setHealthTip] = useState("");
  const [healthTitle, setHealthTitle] = useState("");
  const [currentDate, setDate] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchTip = async () => {
      try {
        const response = await fetch(`https://${API_URL}/mc_tips`);
        const data = await response.json();
        setHealthTitle(data.title)
        setHealthTip(data.content)
        setDate(data.dailytip)
      } catch (error) {
        console.error("Failed to Fetch:", error)
      }
    };
    fetchTip();
  }, []);

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    whileInView={{ duration: 0.5, ease: "fadeIn" }}
    className="lg:w-1/3 w-11/12 h-2/4 mt-8 p-8 bg-card shadow-lg rounded-lg shadow-glow/50 mx-auto"
>
    <div className=''>
        <h2 className="text-2xl sm:text-3xl font-bold">Daily Tip</h2>
        <p className="text-lg sm:text-xl mt-2 sm:mt-4">{currentDate}</p>
        <p className="text-lg sm:text-xl mt-2 sm:mt-4">{healthTitle}</p>
        <p className="text-lg sm:text-xl mt-2 sm:mt-4">{healthTip}</p>
    </div>
    </motion.div>


  
  
    
  
  )
}

export default DailyComponent