import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useUserLogin, useUserRegister } from 'hooks/useAuthorisation'
import { FormEventHandler, useState } from 'react'

const styles = {
  Paper: {
    padding: 20,
    margin: 'auto',
    textAlign: 'center',
    width: 500,
  },
} as const

const AuthForm = () => {
  const { mutateAsync: userRegister } = useUserRegister()
  const { mutateAsync: userLogin } = useUserLogin()
  const [isSignIn, setIsSignIn] = useState(false)

  const onRegister: FormEventHandler<HTMLFormElement> = form => {
    form.preventDefault()
    const formData = new FormData(form.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    const username = formData.get('username') as string

    if (email && password) {
      userRegister({
        email,
        password,
        name,
        username,
      })
    }
  }

  const onSignIn: FormEventHandler<HTMLFormElement> = form => {
    form.preventDefault()
    const formData = new FormData(form.currentTarget)
    const password = formData.get('password') as string
    const username = formData.get('username') as string

    if (password && username) {
      userLogin({
        password,
        username,
      })
    }
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Paper style={styles.Paper}>
          <Typography variant="h3" component="h2" paddingBottom="25px">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Typography>
          <Box
            component="form"
            onSubmit={isSignIn ? onSignIn : onRegister}
            sx={{
              display: 'flex',
              flexFlow: 'column',
              mt: 1,
            }}
          >
            {!isSignIn ? (
              <>
                <TextField label="name" name="name" required margin="normal" />
                <TextField label="email" name="email" required margin="normal" />
              </>
            ) : null}
            <TextField label="username" name="username" required margin="normal" />
            <TextField label="password" name="password" type="password" required margin="normal" />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
              }}
            >
              {isSignIn ? 'Sign In' : 'Sign Up'}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              sx={{
                mt: 2,
              }}
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn ? 'Sign Up' : 'Sign In'}
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default AuthForm
