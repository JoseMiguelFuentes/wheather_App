import React from 'react'
import { useState } from 'react';

const Clock = ()=>{

  const [now, setNow] = useState (0)
  let hour = `${now[0]}${now[1]}`
  let minute = `${now[3]}${now[4]}`
  let seconds = `${now[6]}${now[7]}`
  function clock() {
    
    setNow(new Date().toLocaleTimeString())
    
  }

setInterval(clock, 1000);

return(
  <div id='hour__box'>
    <p className='hour__box-p1' style={{letterSpacing: '2.3px'}}>{hour}:</p>
    <p className='hour__box-p2'>{minute}</p>
    <p className='hour__box-p3'>{seconds}</p>
  </div>
)
}
export default Clock