import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div id="layout" className="flex flex-col">
      <Header />

      <main className="w-screen flex-1 flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout
