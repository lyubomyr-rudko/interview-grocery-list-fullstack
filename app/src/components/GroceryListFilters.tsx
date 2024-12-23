import React, { useId } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import styled from '@emotion/styled'

interface GroceryListFiltersProps {
  onFilterChange: (filters: Partial<GroceryListFilters>) => void
}

const GroceryListFilters: React.FC<GroceryListFiltersProps> = ({ onFilterChange }) => {
  const [status, setStatus] = React.useState<string>('')
  const id = useId()
  const statusOptions = [
    { value: '', label: 'Select Status' },
    { value: 'HAVE', label: 'Have' },
    { value: 'WANT', label: 'Want' },
  ]
  const handleFilterChange = (event: SelectChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as string
    setStatus(value)
    onFilterChange({ status: value })
  }

  return (
    <FilterContaienr>
      <StyledFormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id={`status-label-${id}`}>Status</InputLabel>
        <Select labelId={`status-label-${id}`} label="Status" onChange={handleFilterChange}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
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
