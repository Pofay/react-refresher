import {
  Box,
  AppBar,
  Toolbar,
  Grid,
  Tabs,
  Tab,
  Typography,
  Chip,
} from '@mui/material'
import { SyntheticEvent } from 'react'

type AppHeaderProps = {
  tabIndex: number
  favoritesCount: number
  handleTabChange: (event: SyntheticEvent, newTabIndex: number) => void
}

const AppHeader = ({
  tabIndex,
  favoritesCount,
  handleTabChange,
}: AppHeaderProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <AppHeaderContent
            tabIndex={tabIndex}
            favoritesCount={favoritesCount}
            handleTabChange={handleTabChange}
          />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

const AppHeaderContent = ({
  tabIndex,
  favoritesCount,
  handleTabChange,
}: AppHeaderProps) => {
  return (
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
          <Tab label='All Meetups' />
          <Tab label='Add New Meetup' />
          <Tab
            icon={<Chip label={favoritesCount.toString()} />}
            label='My Favorites'
            iconPosition='end'
          />
        </Tabs>
      </Grid>
    </Grid>
  )
}

export default AppHeader
