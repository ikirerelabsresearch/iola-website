import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Research from './pages/Research'
import Careers from './pages/Careers'
import Updates from './pages/Updates'
import Contact from './pages/Contact'
import Hardware from './pages/Hardware'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"          element={<Home />} />
          <Route path="/about"     element={<About />} />
          <Route path="/research"  element={<Research />} />
          <Route path="/hardware"  element={<Hardware />} />
          <Route path="/careers"   element={<Careers />} />
          <Route path="/updates"   element={<Updates />} />
          <Route path="/contact"   element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
