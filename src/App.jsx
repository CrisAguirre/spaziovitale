import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import MissionVision from './components/MissionVision/MissionVision'
import Services from './components/Services/Services'
import Portfolio from './components/Portfolio/Portfolio'
import Materials from './components/Materials/Materials'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import './styles/global.css'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <MissionVision />
        <Services />
        <Portfolio />
        <Materials />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
