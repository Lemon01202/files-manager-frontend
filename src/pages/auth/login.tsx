import React from 'react'
import { Button, Link, Typography, Paper } from '@mui/material'
import { Container } from '@mui/system'
import GoogleIcon from '@mui/icons-material/Google'

const Login: React.FC = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`
  }

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', maxWidth: 300, width: '100%' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          VrealSoft test task
        </Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
          Sign In / Sign Up
        </Typography>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleLogin}
          sx={{ width: '100%', marginBottom: 2 }}
        >
          Sign in with Google
        </Button>
        <Link href="#" sx={{ display: 'block', textAlign: 'center' }}>
          Need help?
        </Link>
      </Paper>
    </Container>
  )
}

export default Login
