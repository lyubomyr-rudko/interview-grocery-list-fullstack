import { useMutation, useQuery } from '@tanstack/react-query'

import {
  createGroceryItem,
  deleteGroceryItem,
  getGroceryItem,
  getGroceryList,
  updateGroceryItem,
} from '@services/grocery'
import { queryClient } from '@utils/client'

const AUTH_TOKEN_NAME = 'token'

export const useGroceryList = (params?: GroceryFilters, enabled = true) => {
  return useQuery({
    queryKey: ['groceryList', params],
    queryFn: async () => {
      const token = localStorage.getItem(AUTH_TOKEN_NAME) || ''

      try {
        const [list, total] = await getGroceryList({ ...params }, token)

        return [list, total] as const
      } catch (error) {
        queryClient.invalidateQueries({ queryKey: ['user'] })
        throw error
      }
    },
    enabled,
  })
}

export const useGroceryItem = (id: string) => {
  return useQuery({
    queryKey: ['groceryItem', id],
    queryFn: async () => {
      const token = localStorage.getItem(AUTH_TOKEN_NAME) || ''

      try {
        return getGroceryItem(id, token)
      } catch (error) {
        queryClient.invalidateQueries({ queryKey: ['user'] })
        throw error
      }
    },
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

export const useUpdateGrocery = () => {
  return useMutation({
    mutationKey: ['updateGrocery'],
    mutationFn: (groceryItem: GroceryItem) => {
      const token = localStorage.getItem(AUTH_TOKEN_NAME) || ''

      return updateGroceryItem(groceryItem, token)
    },
    onSuccess: (_data, groceryItem) => {
      queryClient.invalidateQueries({ queryKey: ['groceryList'] })
      queryClient.invalidateQueries({ queryKey: ['groceryItem', groceryItem.id] }) // Refresh the specific grocery item
    },
  })
}

export const useDeleteGrocery = () => {
  return useMutation({
    mutationKey: ['deleteGrocery'],
    mutationFn: (id: string) => {
      const token = localStorage.getItem(AUTH_TOKEN_NAME) || ''

      return deleteGroceryItem(id, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groceryList'] })
    },
  })
}
