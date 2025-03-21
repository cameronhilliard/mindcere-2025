import React from 'react'
import * as motion from "motion/react-client"

const InfoComponent = (props) => {
  return (
    <motion.div   
    className='lg:w-2/3 w-11/12 h-2/4 mt-8 p-8 bg-card shadow-lg rounded-lg shadow-glow/50'


>
<div>
    <h2 className='lg:text-2xl text-lg font-bold font-outfit'>{props.prompts}</h2>
    <p className='text-lg mt-4'>{props.response}</p>
</div>
</motion.div>
  )
}

export default InfoComponent