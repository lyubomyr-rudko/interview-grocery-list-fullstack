import ky from 'ky'

import { env } from '@constants/env'

export const registerUser = async (user: { email: string; password: string }) => {
  const response = await ky
    .post(`${env.API_URL}/auth/register`, {
      json: user,
    })
    .json<{ token: string }>()

  return response
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
