"use client"

import { useEffect, useState }  from 'react'
import * as motion from "motion/react-client"
import InfoComponent from './InfoComponent'

const InsightsComponent = () => {

  const [insights, setInsights] = useState([]);

  useEffect(() =>  {
    fetch("http://localhost:8000/api/random-insights")
    .then((response) => response.json())
      .then((data) => {
        setInsights(data);  // Set data into state
        console.log(data)
      });
  }, []);

  return (
    <section id="insights" className='flex flex-col font-outfit text-maintext py-32 p-6 items-center mx-auto'>
      <h1 className='text-4xl'>Insights</h1>
      {insights.map((insight) => (
      <InfoComponent
          key={insight.insights_id}
          prompts={insight.prompt}
          response={insight.response}
        />
      ))}
    </section>
  )
}

export default InsightsComponent