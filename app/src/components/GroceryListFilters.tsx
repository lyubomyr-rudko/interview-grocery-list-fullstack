import React, { useId } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import styled from '@emotion/styled'

interface GroceryListFiltersProps {
  onFilterChange: (filters: Partial<GroceryFilters>) => void
}

const GroceryListFilters: React.FC<GroceryListFiltersProps> = ({ onFilterChange }) => {
  const [status, setStatus] = React.useState<string>('')
  const id = useId()
  const statusOptions = [
    { value: '', label: 'Select Status' },
    { value: 'HAVE', label: 'Have' },
    { value: 'RANOUT', label: 'Ran Out' },
  ]

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value
    setStatus(value)
    onFilterChange({ status: value, skip: 0 })
  }

  return (
    <FilterContaienr>
      <StyledFormControl>
        <InputLabel id={`status-label-${id}`}>Status</InputLabel>
        <Select labelId={`status-label-${id}`} label="Status" value={status} onChange={handleFilterChange}>
          {statusOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </FilterContaienr>
  )
}

const FilterContaienr = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 2;
  border: none;
  border-radius: 8px;
`

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`

export default GroceryListFilters
