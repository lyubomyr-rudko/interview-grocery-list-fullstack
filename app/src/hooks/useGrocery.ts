import { useMutation, useQuery } from '@tanstack/react-query'

import { createGroceryItem, getGroceryList } from '@services/grocery'
import { queryClient } from '@utils/client'

const AUTH_TOKEN_NAME = 'token'

export const useGroceryList = (params?: { priority?: number; status?: string; perPage?: number }, enabled = true) => {
  return useQuery({
    queryKey: ['groceryList'],
    queryFn: async () => {
      const token = localStorage.getItem(AUTH_TOKEN_NAME) || ''

      return getGroceryList({ ...params }, token)
    },
    enabled,
  })
}

export const useCreateGrocery = () => {
  return useMutation({
    mutationKey: ['createGrocery'],
    mutationFn: (groceryItem: GroceryFormItem) => {
      const token = localStorage.getItem(AUTH_TOKEN_NAME) || ''

      return createGroceryItem(groceryItem, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groceryList'] })
    },
  })
}
