export default {
  items: [
    {
      name: "Dashboard Recruiter",
      url: "/dashboardrecruiter",
      icon: "icon-speedometer"
    },
    {
      name: "Users",
      url: "/users",
      icon: "icon-people"
    },
    {
      name: "Candidates",
      url: "/candidates",
      icon: "icon-people"
    },
    {
      name: "Companies",
      url: "/companies",
      icon: "icon-location-pin"
    },
    {
      name: "Vacancies",
      url: "/vacancies",
      icon: "icon-briefcase"
    },
    {
      name: "Email",
      url: "/email",
      icon: "icon-envelope",
      children: [
        {
          name: "Inbox",
          url: "/email/inbox",
          icon: "icon-speech"
        },
        // {
        //   name: "Message",
        //   url: "/email/message/:id",
        //   icon: "icon-speech"
        // },
        {
          name: "New message",
          url: "/email/compose",
          icon: "icon-speech"
        }
      ]
    },
    {
      name: "Calendar",
      url: "/calendar",
      icon: "icon-calendar"
    }
    // {
    //   name: "Charts",
    //   url: "/charts",
    //   icon: "icon-pie-chart"
    // }
  ]
};
