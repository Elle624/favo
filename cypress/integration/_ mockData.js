const _mockData = {
  user: {
    id: 1,
    name: "Peach Perfect",
    rating: 1.4,
    profilePicture: "https://randomuser.me/api/portraits/men/52.jpg",
    volunteeredHours: 8.2,
    upcomingJobs: [
      {
        id: "1-posting-23",
        eventId: "event-20",
        eventName: "Help students to have a dinner",
        positionName: "cook",
        date: "2021/03/01",
      },
    ],
  },
  events: [
    {
      id: "event-1",
      date: "2021/02/01",
      name: "Color Run",
      organization: "The Color Run, LLC.",
      location: "123 Cassette Dr., Denver, CO, 80204",
      description:
        "The Color Run is an event series and five kilometer paint race, inspired by the Hindu festival of Holi, that is owned and operated by The Color Run LLC, a for-profit company.",
      duration: 10,
      category: "Sports",
      openJobs: [
        {
          id: "posting-1",
          name: "assisting with check-in",
          numberOfSpots: 3,
        },
        {
          id: "posting-2",
          name: "tossing color",
          numberOfSpots: 5,
        },
        {
          id: "posting-3",
          name: "handing out water",
          numberOfSpots: 6,
        },
      ],
    },
    {
      id: "event-2",
      date: "2021/02/05",
      name: "Food Delivery",
      organization: "Individual",
      location: "123 Goose Blv., Denver, CO, 80208",
      description: "Deliver food for a memorial hospital",
      duration: 3,
      category: "Healthcare",
      openJobs: [
        {
          id: "posting-4",
          name: "driver",
          numberOfSpots: 2,
        },
        {
          id: "posting-5",
          name: "cook",
          numberOfSpots: 3,
        },
      ],
    },
  ],
};

export default _mockData;
