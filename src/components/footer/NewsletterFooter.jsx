import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

export default function NewsletterFooter() {
  return (
    <>
    <Typography variant="h6" gutterBottom>
            Subscribe to Our Newsletter
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              placeholder="Enter your email"
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1 }}
            />
            <Button variant="contained" color="primary">
              Subscribe
            </Button>
          </Box>
    </>
  )
}
