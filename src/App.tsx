import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components'
import { Home, About, Outreach, Robots } from './pages'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/outreach" element={<Outreach />} />
          <Route path="/robots" element={<Robots />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
