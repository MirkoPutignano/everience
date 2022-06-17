import { useSelector } from 'react-redux'
import { printInitialRoutes } from 'router'
//import {component} from 'react'

function App() {
  const logged = useSelector((state) => state.logged)

  return (
    printInitialRoutes(logged)
  );
}

export default App
