import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { useState } from 'react'
import { Card, CardContent, CardHeader, IconButton } from '@mui/material'
import Container from '@mui/material/Container'
import { Add, Edit, Save } from '@mui/icons-material'
import GroceryList from '@components/GroceryList'
import GroceryForm from '@components/GroceryForm'
import { useUser } from 'hooks/useAuthorisation'
import AuthForm from '@components/AuthForm'

function App() {
  const [openForm, setOpenForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { data: userData } = useUser()

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  const handleFormOpen = () => {
    setOpenForm(true)
  }

  console.log('~~> userData', userData)

  return (
    <Container>
      {!userData ? (
        <AuthForm />
      ) : (
        <Card sx={{ my: 4 }} variant="outlined">
          <CardHeader
            title="Grocery List"
            action={
              <>
                <IconButton onClick={handleEditClick}>{isEditing ? <Save /> : <Edit />}</IconButton>
                <IconButton onClick={handleFormOpen}>
                  <Add />
                </IconButton>
              </>
            }
          />
          <CardContent>
            <GroceryList isEditing={isEditing} />
            <GroceryForm openForm={openForm} setOpenForm={setOpenForm} />
          </CardContent>
        </Card>
      )}
    </Container>
  )
}

export default App
