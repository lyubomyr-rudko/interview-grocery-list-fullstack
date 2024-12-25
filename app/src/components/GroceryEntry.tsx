import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import { formatDateTime } from '@utils/date'
import { useGroceryItem, useUpdateGrocery } from 'hooks/useGrocery'
import { useRef } from 'react'

export const GroceryEntry: React.FC<{ id: string; onBackClick: () => void }> = ({ id, onBackClick }) => {
  const { mutateAsync: updateGroceryItem } = useUpdateGrocery()
  const { data } = useGroceryItem(id)
  const initialCheckedRef = useRef<boolean | undefined>()

  if (!data) return null

  initialCheckedRef.current =
    initialCheckedRef.current === undefined ? data.status === 'HAVE' : initialCheckedRef.current
  const initialChecked = initialCheckedRef.current

  const handleToggleHave = (item: GroceryItem) => async () => {
    const newStatus = item.status == 'HAVE' ? 'RANOUT' : ('HAVE' as const)
    await updateGroceryItem({ ...item, status: newStatus })
  }

  return (
    <Card sx={{ my: 4 }} variant="outlined">
      <CardHeader
        title="Grocery Entry"
        action={
          <Button variant="contained" color="secondary" onClick={onBackClick}>
            Back to List
          </Button>
        }
      />
      <CardContent>
        <List>
          <ListItem>
            <ListItemText primary="Name" secondary={data.name} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Quantity" secondary={data.quantity} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Priority" secondary={data.priority} />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Status"
              secondary={<Checkbox defaultChecked={initialChecked} onChange={handleToggleHave(data)} />}
            />
          </ListItem>

          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.history?.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{formatDateTime(item.createdAt)}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </List>
      </CardContent>
    </Card>
  )
}
export default GroceryEntry
