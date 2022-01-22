import { rest } from 'msw'

interface Meetup {
  id: number
  title: string
  image: string
  address: string
  description: string
}

let allMeetups: Array<Meetup> = [
  {
    id: 1,
    title: 'React Dev Berlin Conference',
    image: 'https://miro.medium.com/max/1024/1*zV6JSvx76Gl6y9jMXdurjg.jpeg',
    address: 'Berlin',
    description: 'New York City',
  },
  {
    id: 2,
    title: 'GDC Conference',
    image:
      'https://mogi-group.com/content/uploads/2018/02/mogi-group-attend-gdc-2018.png',
    address: 'New York',
    description: 'New York City',
  },
]

interface CreateNewMeetupBody {
  id: number
  title: string
  image: string
  address: string
  description: string
}

export const handlers = [
  rest.get('/meetups', (req, res, ctx) => {
    return res(ctx.json({ data: allMeetups }))
  }),

  rest.post<CreateNewMeetupBody>('/meetups', (req, res, ctx) => {
    const { id, title, image, address, description } = req.body

    const createdMeetup: Meetup = {
      id,
      title,
      image,
      address,
      description,
    }

    allMeetups = allMeetups.concat(createdMeetup)

    return res(ctx.status(201), ctx.json({ data: createdMeetup }))
  }),
]
