import moment from "moment";

export const companies = {
  id: "1",
  color: "primary",
  title: "Companies",
  desc: "Amount of companies with vacancies in Open/Hot status",
  links: [
    { title: "Companies", route: "/companies" },
    { title: "Vacancies", route: "/vacancies" }
  ]
};

export const vacancies = {
  id: "2",
  color: "primary",
  title: "Vacancies",
  desc: "Amount of vacancies in Open/Hot status",
  links: [
    { title: "Vacancies", route: "/vacancies" },
    { title: "Companies", route: "/companies" }
  ]
};

export const recruiters = {
  id: "3",
  color: "info",
  title: "Recruiters",
  desc: "Amount of recruiters",
  links: [{ title: "Users", route: "/users" }]
};

export const freelancers = {
  id: "4",
  color: "info",
  title: "Freelancers",
  desc: "Amount of freelancers",
  links: [{ title: "Users", route: "/users" }]
};

export const candidates = {
  id: "5",
  color: "danger",
  title: "Candidates",
  desc: "Amount of candidates sent on vacancies",
  links: [
    { title: "Candidates", route: "/candidates" },
    { title: "Vacancies", route: "/vacancies" }
  ],
  time: moment().calendar()
};

export const interviews = {
  id: "6",
  color: "danger",
  title: "Interviews",
  desc: "Amount of scheduled interviews",
  links: [{ title: "Candidates", route: "/candidates" }],
  time: moment().calendar()
};

export const offerCandidates = {
  id: "7",
  color: "success",
  title: "OFFER Candidates",
  desc: "Amount of candidates with offer",
  links: [{ title: "Candidates", route: "/candidates" }],
  time: moment().format("MMMM YYYY")
};
