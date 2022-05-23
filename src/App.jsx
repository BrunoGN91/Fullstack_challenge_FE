
import useApi from './hooks/useApi'
import { ApiProvider } from './context/ApiProvider'
import Navigation from './components/Navigation'
import Home from './components/Home'
import './App.css'

function App() {
  

  return (
  <ApiProvider>
      <Navigation />
  </ApiProvider>
  )
}

export default App
