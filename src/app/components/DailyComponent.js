"use client"

import React from 'react'
import { useState, useEffect} from "react";
import * as motion from "motion/react-client"



const DailyComponent = () => {

  
  const [healthTip, setHealthTip] = useState("");
  const [healthTitle, setHealthTitle] = useState("");


  useEffect(() => {
    const fetchTip = async () => {
      try {
        const response = await fetch("http://localhost:8000/mc_tips");
        const data = await response.json();
        setHealthTitle(data.title)
        setHealthTip(data.content)
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
        whileInView={{duration: 0.5, ease: "fadeIn" }}
        className='w-1/3 h-2/4 mt-8 p-8 bg-card shadow-lg rounded-lg shadow-glow/50'
    >
    <div>
        <h2 className='text-3xl font-bold'>Daily Tip</h2>
        <p className='text-xl mt-4'>{healthTitle}</p>
        <p className='text-xl mt-4'>{healthTip}</p>
    </div>
    </motion.div>


  
  
    
  
  )
}

export default DailyComponent