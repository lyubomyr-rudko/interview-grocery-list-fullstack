import { FC, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  IconButton,
  TextField,
  debounce,
} from '@mui/material'
import { Delete } from '@mui/icons-material'

import { useDeleteGrocery, useGroceryList, useUpdateGrocery } from 'hooks/useGrocery'
import Filters from './GroceryListFilters'
import Pagination from './GroceryListPagination'

const ITEMS_PER_PAGE = 10

const GroceryList: FC<{ isEditing?: boolean }> = ({ isEditing }) => {
  const [listParams, setListParams] = useState<GroceryFilters>({
    skip: 0,
    take: ITEMS_PER_PAGE,
  })
  const { data: dataAndTotal, isLoading, isError, error } = useGroceryList(listParams)

  const data = dataAndTotal?.[0] || []
  const totalCount = dataAndTotal?.[1] || 0

  const { mutateAsync: deleteGroceryItem } = useDeleteGrocery()
  const { mutateAsync: updateGroceryItem } = useUpdateGrocery()

  const handleDelete = (item: GroceryItem) => async () => {
    await deleteGroceryItem(item.id)
  }
  const handleToggleHave = (item: GroceryItem) => async () => {
    const newStatus = item.status == 'HAVE' ? 'RANOUT' : ('HAVE' as const)
    await updateGroceryItem({ ...item, status: newStatus })
  }
  const handleQuantityChange = (item: GroceryItem) =>
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      const quantity = parseInt(event.target.value, 10)
      updateGroceryItem({ ...item, quantity })
    }, 500)
  const handlePriorityChange = (item: GroceryItem) =>
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      const priority = parseInt(event.target.value, 10)
      updateGroceryItem({ ...item, priority })
    }, 500)

  const handleFilterChange = (filters: Partial<GroceryFilters>) => {
    setListParams({ ...listParams, ...filters })
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <>
      <Filters onChange={handleFilterChange} value={listParams} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
              {isEditing && <TableCell>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {isEditing ? (
                    <TextField defaultValue={item.priority} onChange={handlePriorityChange(item)} />
                  ) : (
                    item.priority
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <TextField defaultValue={item.quantity} onChange={handleQuantityChange(item)} />
                  ) : (
                    item.quantity
                  )}
                </TableCell>
                <TableCell>
                  <Checkbox checked={item.status === 'HAVE'} onChange={handleToggleHave(item)} />
                </TableCell>
                {isEditing && (
                  <TableCell>
                    <IconButton onClick={handleDelete(item)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        total={totalCount}
        take={listParams.take}
        skip={listParams.skip}
        onFilterChange={handleFilterChange}
      />
    </>
  )
}

export default GroceryList
