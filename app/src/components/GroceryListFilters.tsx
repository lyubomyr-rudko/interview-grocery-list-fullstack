import React, { useId } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import styled from '@emotion/styled'

interface GroceryListFiltersProps {
  onChange: (filters: Partial<GroceryFilters>) => void
  value: GroceryFilters
}

const GroceryListFilters: React.FC<GroceryListFiltersProps> = ({ onChange, value }) => {
  const id = useId()
  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'HAVE', label: 'Have' },
    { value: 'RANOUT', label: 'Ran Out' },
  ]

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value === 'all' ? '' : event.target.value
    onChange({ status: value, skip: 0 })
  }
  const status = value.status || 'all'

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
