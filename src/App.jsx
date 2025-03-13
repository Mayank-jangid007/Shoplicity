import React from 'react'
import './App.css'
import NavBar from "./Components/NavBar"
import Header from './Components/Header'
// import Home from './pages/Home'
import { Outlet } from "react-router";
import ErrorBoundary from './Components/ErrorBoundary'

function App() {

  return (
    <div className='relative h-full  w-full bg-gray-900'>
      <ErrorBoundary>
      <Header/>
      </ErrorBoundary>

      <ErrorBoundary>
      <Outlet/>
      </ErrorBoundary>

      <ErrorBoundary>
      <NavBar/>
      </ErrorBoundary>
    </div>
  )
}

export default App
