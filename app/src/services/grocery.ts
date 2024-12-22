import ky from 'ky'

import { env } from '@constants/env'

export const getGroceryList = async (
  params: { priority?: number; status?: string; perPage?: number },
  token: string,
) => {
  const searchParams = new URLSearchParams(params as Record<string, string>)
  const response = await ky
    .get(`${env.API_URL}/grocery`, {
      searchParams,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<{ data: GroceryItem[] }>()

  return response.data
}

export const createGroceryItem = async (groceryItem: GroceryFormItem, token: string) => {
  const response = await ky
    .post(`${env.API_URL}/grocery`, {
      json: groceryItem,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<{ data: GroceryItem }>()

  return response.data
}

export const updateGroceryItem = async (groceryItem: GroceryItem, token: string) => {
  const response = await ky
    .put(`${env.API_URL}/grocery/${groceryItem.id}`, {
      json: groceryItem,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<{ data: GroceryItem }>()

  return response.data
}

export const deleteGroceryItem = async (id: string, token: string) => {
  const response = await ky
    .delete(`${env.API_URL}/grocery/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<{ data: GroceryItem }>()

  return response.data
}
