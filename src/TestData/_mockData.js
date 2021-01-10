const _mockData = {
  user: {
    id: 1,
    name: "Peach Perfect",
    rating: 1.4,
    profilePicture: "https://randomuser.me/api/portraits/men/52.jpg",
    volunteeredHours: 8.2,
    upcomingJobs: [
      {
        id: "1-posting-30",
        eventId: "event-20",
        eventName: "Something Crazy",
        positionName: "cook",
        date: "2021/03/01",
      },
    ],
  },
  events: [
    {
      id: "event-20",
      date: "2021/03/01",
      name: "Something Crazy",
      organization: "Something Else, LLC",
      location: "123 Something Dr., Somewhere, CO, 00000",
      description:
        "Something crazy happening somewhere in the somewhere of somewhere CO. Come do something with someone.",
      duration: 10,
      category: "Something",
      openJobs: [
        {
          id: "posting-30",
          name: "cook",
          numberOfSpots: 3,
        },
        {
          id: "posting-31",
          name: "tossing color",
          numberOfSpots: 5,
        },
        {
          id: "posting-32",
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
