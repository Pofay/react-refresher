import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { SyntheticEvent } from 'react'

interface MeetupCardProps {
  id: number
  title: string
  image: string
  address: string
  description: string
  onFavorite: (event: SyntheticEvent, meetupId: number) => void
}

const MeetupCard = ({
  id,
  title,
  image,
  address,
  description,
  onFavorite,
}: MeetupCardProps) => {
  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', marginTop: '20px' }}>
      <CardMedia component='img' height='140' src={image} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={(event: SyntheticEvent) => onFavorite(event, id)}
          size='small'
        >
          Favorite
        </Button>
      </CardActions>
    </Card>
  )
}

export default MeetupCard
