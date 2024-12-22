import { FC } from 'react'
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

const GroceryList: FC<{ isEditing?: boolean }> = ({ isEditing }) => {
  const { data, isLoading, isError, error } = useGroceryList()
  const { mutateAsync: deleteGroceryItem } = useDeleteGrocery()
  const { mutateAsync: updateGroceryItem } = useUpdateGrocery()

  const handleDelete = (item: GroceryItem) => async () => {
    await deleteGroceryItem(item.id)
  }
  const handleToggleHave = (item: GroceryItem) => async () => {
    const newStatus = item.status == 'HAVE' ? 'WANT' : ('HAVE' as const)
    await updateGroceryItem({ ...item, status: newStatus })
  }
  const handleQuantityChange = (item: GroceryItem) =>
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      const quantity = parseInt(event.target.value, 10)
      updateGroceryItem({ ...item, quantity })
    }, 500)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
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
  )
}

export default GroceryList
