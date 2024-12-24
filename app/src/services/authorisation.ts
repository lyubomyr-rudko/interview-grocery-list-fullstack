import ky, { HTTPError } from 'ky'

import { env } from '@constants/env'

export const registerUser = async (user: { email: string; password: string }) => {
  try {
    const response = await ky
      .post(`${env.API_URL}/auth/register`, {
        json: user,
      })
      .json<{ token: string }>()

    return response
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json()
      throw new Error(errorBody.error || 'Something went wrong')
    } else {
      throw new Error('Network error occurred')
    }
  }
}

export const loginUser = async (user: { username: string; password: string }) => {
  const response = await ky
    .post(`${env.API_URL}/auth/login`, {
      json: user,
    })
    .json<{ token: string }>()

  return response
}

export const getUser = async (token: string) => {
  const response = await ky
    .get(`${env.API_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<{ username: string }>()

  return response
}
