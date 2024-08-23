
import './App.css'
import Tablex from './components/Tablex'

import { ChakraProvider } from '@chakra-ui/react'

function App() {
  

  return (
    <>
     <ChakraProvider>
      <Tablex/>
      
    </ChakraProvider>
    </>
  )
}

export default App
