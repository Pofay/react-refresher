import React, { SyntheticEvent, useEffect, useState } from 'react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './App.css'
import { Button, Stack, TextField, Typography } from '@mui/material'
import AppHeader from './components/AppHeader'
import TabPanel from './components/TabPanel'
import MeetupCard from './components/MeetupCard'

type Meetup = {
  id: number
  title: string
  image: string
  address: string
  description: string
}

function App() {
  const [tabIndex, setTabIndex] = useState(0)
  const [meetups, setMeetups] = useState<Array<Meetup>>([])
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [currentId, setCurrentId] = useState(3)

  useEffect(() => {
    fetch('/meetups')
      .then((res) => res.json())
      .then((res) => {
        setMeetups(res.data)
      })
  }, [])

  const resetFormData = () => {
    setTitle('')
    setAddress('')
    setImage('')
    setDescription('')
  }

  // provide function to post to msw for meetup
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
      }),
    })
      .then((res) => res.json())
      .then((res) => res.data)

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    postNewMeetup(currentId, title, image, address, description)
      .then((res) => {
        const updatedMeetups = meetups.concat(res)
        setMeetups(updatedMeetups)
        setCurrentId(currentId + 1)
      })
      .then(() => resetFormData())
  }
  // provide function to put to msw for favorites

  const handleTabChange = (event: SyntheticEvent, newTabIndex: number) => {
    event.preventDefault()
    setTabIndex(newTabIndex)
  }

  return (
    <div className='App'>
      <AppHeader tabIndex={tabIndex} handleTabChange={handleTabChange} />
      <div style={{ margin: 'auto', width: '900px' }}>
        <TabPanel value={tabIndex} index={0}>
          <Typography variant='h3'>All Current Meetups</Typography>
          {meetups.map((m) => (
            <MeetupCard key={m.id} {...m} />
          ))}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Typography variant='h3'>Add New Meetup</Typography>
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
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <Typography variant='h3'>My Favorites</Typography>
        </TabPanel>
      </div>
    </div>
  )
}

export default App
