
import './App.css'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import {ThemeProvider} from "./components/theme-provider"
import Home from "./pages/Home"
import Footer from "./pages/Footer"
import { ModeToggle } from './components/mode-toggle'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, useScroll } from "framer-motion";
import ProjectView from './pages/ProjectView'
function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="app" >
 <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />    <ThemeProvider  defaultTheme="dark" storageKey="vite-ui-theme">
     <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="project/:id" element={<ProjectView/>} />
      </Routes>
      <Footer/>
      <ToastContainer theme="dark" />
      </Router> 

    </ThemeProvider>
    </div>
  )
}

export default App
