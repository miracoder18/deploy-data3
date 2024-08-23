import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'

function Postbutton({ toog , settoog}) {
  return (
    <div>
     
      <Button  margin={4}colorScheme='pink' onClick={()=>{
settoog((toog)=>!toog)
      }}>Show</Button>
    </div>
  
  )
}

export default Postbutton
