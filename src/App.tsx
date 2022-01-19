import React, { SyntheticEvent, useState } from 'react'
import logo from './logo.svg'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './App.css'
import {
  AppBar,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

function App() {
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabChange = (event: SyntheticEvent, newTabIndex: number) => {
    event.preventDefault()
    setTabIndex(newTabIndex)
  }

  return (
    <div className='App'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography
                  variant='h4'
                  component='div'
                  sx={{ flexGrow: 1, marginTop: '19px', marginBottom: '19px' }}
                >
                  React Meetups
                </Typography>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <Tabs
                  value={tabIndex}
                  onChange={handleTabChange}
                  aria-label='Menu tabs for each page'
                  textColor='secondary'
                  indicatorColor='secondary'
                >
                  <Tab label='All Meetups' href='/meetups' />
                  <Tab label='Add New Meetup' href='/newMeetup' />
                  <Tab
                    icon={<Chip label='0' />}
                    label='My Favorites'
                    iconPosition='end'
                    href='/favorites'
                  />
                </Tabs>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default App
