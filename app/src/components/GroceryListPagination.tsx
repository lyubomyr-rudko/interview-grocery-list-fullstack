import React from 'react'
import { Pagination, Box } from '@mui/material'

interface PaginationProps {
  total: number
  take: number
  skip: number
  onFilterChange: (filters: { take: number; skip: number }) => void
}

const GroceryListPagination: React.FC<PaginationProps> = ({ total, take, skip, onFilterChange }) => {
  const page = skip / take + 1
  const totalPages = Math.ceil(total / take)

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onFilterChange({ skip: (value - 1) * take, take })
  }

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </Box>
  )
}

export default GroceryListPagination
