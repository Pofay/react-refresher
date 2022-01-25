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
import { Meetup } from './types/meetup'
import MeetupForm from './components/MeetupForm'

function App() {
  const [tabIndex, setTabIndex] = useState(0)
  const [meetups, setMeetups] = useState<Array<Meetup>>([])
  const [currentId, setCurrentId] = useState(3)

  useEffect(() => {
    fetch('/meetups')
      .then((res) => res.json())
      .then((res) => {
        setMeetups(res.data)
      })
  }, [])

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
          <MeetupForm
            currentId={currentId}
            meetups={meetups}
            setCurrentId={setCurrentId}
            setMeetups={setMeetups}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <Typography variant='h3'>My Favorites</Typography>
        </TabPanel>
      </div>
    </div>
  )
}

export default App
