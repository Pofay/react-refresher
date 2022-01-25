import { Stack, TextField, Button } from '@mui/material'
import { useState, SyntheticEvent } from 'react'
import { Meetup } from '../types/meetup'

interface MeetupFormProps {
  currentId: number
  meetups: Array<Meetup>
  setCurrentId: (curretnId: number) => void
  setMeetups: (meetups: Array<Meetup>) => void
}

const MeetupForm = ({
  currentId,
  meetups,
  setCurrentId,
  setMeetups,
}: MeetupFormProps) => {
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')

  const resetFormData = () => {
    setTitle('')
    setAddress('')
    setImage('')
    setDescription('')
  }

  const postNewMeetup = (
    id: number,
    title: string,
    image: string,
    address: string,
    description: string
  ) =>
    fetch('/meetups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        title,
        address,
        image,
        description,
        isFavorite: false,
      }),
    })
      .then((res) => res.json())
      .then((res) => res.data)

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    postNewMeetup(currentId, title, image, address, description)
      .then((res) => {
        setMeetups([...meetups, res])
        setCurrentId(currentId + 1)
      })
      .then(() => resetFormData())
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <Stack
        component='div'
        spacing={2}
        sx={{ width: '500px', margin: 'auto' }}
      >
        <TextField
          required
          id='meetup-title'
          label='Title'
          variant='standard'
          value={title}
          onChange={(event: SyntheticEvent) => {
            const target = event.target as HTMLInputElement
            setTitle(target.value)
          }}
        />
        <TextField
          required
          id='meetup-address'
          label='Address'
          variant='standard'
          value={address}
          onChange={(event: SyntheticEvent) => {
            const target = event.target as HTMLInputElement
            setAddress(target.value)
          }}
        />
        <TextField
          required
          id='meetup-image'
          label='Image url'
          variant='standard'
          value={image}
          onChange={(event: SyntheticEvent) => {
            const target = event.target as HTMLInputElement
            setImage(target.value)
          }}
        />
        <TextField
          required
          id='meetup-description'
          label='Description'
          variant='standard'
          value={description}
          onChange={(event: SyntheticEvent) => {
            const target = event.target as HTMLInputElement
            setDescription(target.value)
          }}
        />
        <Button type='submit'>Submit</Button>
      </Stack>
    </form>
  )
}

export default MeetupForm
