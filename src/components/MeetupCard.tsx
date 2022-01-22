import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'

interface MeetupCardProps {
  id: number
  title: string
  image: string
  address: string
  description: string
}

const MeetupCard = ({
  id,
  title,
  image,
  address,
  description,
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
        <Button size='small'>Favorite</Button>
      </CardActions>
    </Card>
  )
}

export default MeetupCard
