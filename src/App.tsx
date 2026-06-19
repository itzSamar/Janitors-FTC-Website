import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components'
import { Home, About, Outreach, Robots } from './pages'

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

  return (
    <BrowserRouter basename={basename}>
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
