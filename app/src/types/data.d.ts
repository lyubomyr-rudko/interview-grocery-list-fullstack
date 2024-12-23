interface GroceryItem {
  id: string
  name: string
  quantity?: number
  priority?: number
  status?: 'HAVE' | 'RANOUT'
  createdAt?: string
  updatedAt?: string
}

interface GroceryFormItem {
  name: string
  quantity?: number
}

interface GroceryItemUpdate extends GroceryFormItem {
  id: string
}

interface GroceryFilters {
  take: number
  skip: number
  priority?: number
  status?: string
}

interface RegisterUser {
  email: string
  password: string
  username: string | null
  name: string | null
}

interface LoginUser {
  username: string
  password: string
}
