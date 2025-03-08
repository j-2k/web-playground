  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import { BrowserRouter, Routes, Route } from 'react-router'
  import './index.css'
  import { Empty, Home, NotFound } from './main-pages.tsx'
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Empty />} />
            <Route path="/home" element={<Home/>} />
            <Route path='/3d' element={<NotFound/>} />
            <Route path='/*' element={<NotFound/>} />
          </Routes>
      </BrowserRouter>
    </StrictMode>,
  )