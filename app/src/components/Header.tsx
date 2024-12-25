import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { useUser, useUserLogout } from 'hooks/useAuthorisation'

const Header: React.FC = () => {
  const { mutateAsync: handleUserLogout } = useUserLogout()
  const { data: userData, isLoading } = useUser()

  const handleLogout = () => {
    handleUserLogout()
  }

  if (isLoading || !userData) return null

  return (
    <AppBar position="sticky" color="primary" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              color: '#ffffff',
              borderColor: '#ffffff',
              marginLeft: 'auto',
              '&:hover': {
                borderColor: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
