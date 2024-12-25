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
import GroceryEntry from '@components/GroceryEntry'
import Header from '@components/Header'

function App() {
  const [openForm, setOpenForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const { data: userData, isLoading } = useUser()

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  const handleFormOpen = () => {
    setOpenForm(true)
  }

  const handleItemClick = (item: GroceryItem) => {
    setSelectedItemId(item.id)
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <Header />

      <Container>
        {!userData ? (
          <AuthForm />
        ) : selectedItemId ? (
          <GroceryEntry id={selectedItemId} onBackClick={() => setSelectedItemId(null)} />
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
              <GroceryList isEditing={isEditing} onItemClick={handleItemClick} />
              <GroceryForm openForm={openForm} setOpenForm={setOpenForm} />
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  )
}

export default App
