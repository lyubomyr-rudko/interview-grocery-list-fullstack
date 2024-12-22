import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useUserLogin, useUserRegister } from 'hooks/useAuthorisation'
import { useForm, Controller, FieldErrors } from 'react-hook-form'
import { useState } from 'react'

const styles = {
  Paper: {
    padding: 20,
    margin: 'auto',
    textAlign: 'center',
    width: 500,
  },
} as const

type SignInFormValues = {
  username: string
  password: string
}

type SignUpFormValues = {
  name: string
  email: string
  username: string
  password: string
}

const AuthForm = () => {
  const { mutateAsync: userRegister, error: apiError } = useUserRegister()
  const { mutateAsync: userLogin } = useUserLogin()
  const [isSignIn, setIsSignIn] = useState(true)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFormValues | SignUpFormValues>({
    defaultValues: {
      username: '',
      password: '',
      ...(isSignIn ? {} : { name: '', email: '' }),
    },
  })

  const onSubmit = async (data: SignInFormValues | SignUpFormValues) => {
    if (isSignIn) {
      const { username, password } = data as SignInFormValues
      if (username && password) {
        await userLogin({ username, password })
      }
    } else {
      const { name, email, username, password } = data as SignUpFormValues
      if (email && password) {
        await userRegister({ name, email, username, password })
      }
    }
    reset() // Reset form after submission
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
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: 'flex',
              flexFlow: 'column',
              mt: 1,
            }}
          >
            {!isSignIn && (
              <>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      margin="normal"
                      error={!!(errors as FieldErrors<SignUpFormValues>).name}
                      helperText={(errors as FieldErrors<SignUpFormValues>).name?.message}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      margin="normal"
                      error={!!(errors as FieldErrors<SignUpFormValues>).email}
                      helperText={(errors as FieldErrors<SignUpFormValues>).email?.message}
                    />
                  )}
                />
              </>
            )}
            <Controller
              name="username"
              control={control}
              rules={{ required: 'Username is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  margin="normal"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Typography variant="body2" color="error">
              {apiError?.message}
            </Typography>
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
              onClick={() => {
                setIsSignIn(!isSignIn)
                reset() // Reset form when switching modes
              }}
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
