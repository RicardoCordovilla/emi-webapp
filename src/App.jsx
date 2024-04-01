import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Pay from './pages/Pay'
import View from './pages/View'
// import './App.css'

const baseURL = 'http://localhost:9000/api/pays'



function App() {

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Pay />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
