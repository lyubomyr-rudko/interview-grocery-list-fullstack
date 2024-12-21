import { useMutation, useQuery } from '@tanstack/react-query'

import { loginUser, registerUser, getUser } from '@services/authorisation'
import { queryClient } from '@utils/client'

export const AUTH_TOKEN_NAME = 'token'

export const useUserRegister = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (user: RegisterUser) => {
      const response = await registerUser(user)

      console.log('~~> response', response)

      localStorage.setItem(AUTH_TOKEN_NAME, response.token)

      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export const useUserLogin = () => {
  return useMutation({
    mutationKey: ['login'],

    mutationFn: async (user: LoginUser) => {
      const response = await loginUser(user)

      localStorage.setItem(AUTH_TOKEN_NAME, response.token)

      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export const useUserLogout = () => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      localStorage.removeItem(AUTH_TOKEN_NAME)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = localStorage.getItem(AUTH_TOKEN_NAME) || ''

      if (!token) {
        return Promise.reject(new Error('Token not found'))
      }

      try {
        const response = await getUser(token)

        return response
      } catch (error) {
        localStorage.removeItem(AUTH_TOKEN_NAME)

        return error
      }
    },
  })
}
