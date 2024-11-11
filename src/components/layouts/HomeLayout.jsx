import React from 'react'
import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

import NavBar from '../navbar/NavBar'
import Footer from '../footer/Footer'

function HomeLayout({ children }) {
  return (
    <Box
    sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", minWidth: "100vh" }}
  >
    {/* Navigation Bar */}
    <NavBar />

    {/* Main Content (Children) */}
    <Box
      component="main"
      sx={{ flexGrow: 1, paddingTop: 2, paddingBottom: 2 }}
    >
      {children}
    </Box>

    {/* Footer */}
    <Footer />
  </Box>
  )
}

export default HomeLayout