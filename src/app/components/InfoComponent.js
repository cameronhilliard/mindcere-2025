import React from 'react'
import * as motion from "motion/react-client"

const InfoComponent = (props) => {
  return (
    <div className='w-2/3 h-2/4 mt-8 p-8 bg-card shadow-lg rounded-lg shadow-glow/50'


>
<div>
    <h2 className='text-2xl font-bold'>{props.prompts}</h2>
    <p className='text-lg mt-4'>{props.response}</p>
</div>
</div>
  )
}

export default InfoComponent