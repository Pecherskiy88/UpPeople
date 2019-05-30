import React from "react";
import DefaultLayout from "./containers/DefaultLayout";

// import CodeEditors from './views/Editors/CodeEditors'
const CodeEditors = React.lazy(() => import("./views/Editors/CodeEditors"));
const TextEditors = React.lazy(() => import("./views/Editors/TextEditors"));

// const Compose = React.lazy(() => import('./views/Apps/Email/Compose'));
// const Inbox = React.lazy(() => import('./views/Apps/Email/Inbox'));
// const Message = React.lazy(() => import('./views/Apps/Email/Message'));
const Invoice = React.lazy(() => import("./views/Apps/Invoicing/Invoice"));

const AdvancedForms = React.lazy(() => import("./views/Forms/AdvancedForms"));
const BasicForms = React.lazy(() => import("./views/Forms/BasicForms"));
const ValidationForms = React.lazy(() =>
  import("./views/Forms/ValidationForms")
);
const GoogleMaps = React.lazy(() => import("./views/GoogleMaps"));
const Toastr = React.lazy(() => import("./views/Notifications/Toastr"));
const Calendar = React.lazy(() =>
  import("./components/pages/CalendarPage/CalendarPage")
);
const Draggable = React.lazy(() => import("./views/Plugins/Draggable"));
const Spinners = React.lazy(() => import("./views/Plugins/Spinners"));
const DataTable = React.lazy(() => import("./views/Tables/DataTable"));
const Tables = React.lazy(() => import("./views/Tables/Tables"));
const LoadingButtons = React.lazy(() =>
  import("./views/Buttons/LoadingButtons")
);

const Breadcrumbs = React.lazy(() => import("./views/Base/Breadcrumbs"));
const Cards = React.lazy(() => import("./views/Base/Cards"));
const Carousels = React.lazy(() => import("./views/Base/Carousels"));
const Collapses = React.lazy(() => import("./views/Base/Collapses"));
const Dropdowns = React.lazy(() => import("./views/Base/Dropdowns"));

const Jumbotrons = React.lazy(() => import("./views/Base/Jumbotrons"));
const ListGroups = React.lazy(() => import("./views/Base/ListGroups"));
const Navbars = React.lazy(() => import("./views/Base/Navbars"));
const Navs = React.lazy(() => import("./views/Base/Navs"));
const Paginations = React.lazy(() => import("./views/Base/Paginations"));
const Popovers = React.lazy(() => import("./views/Base/Popovers"));
const ProgressBar = React.lazy(() => import("./views/Base/ProgressBar"));
const SpinnersB4 = React.lazy(() => import("./views/Base/Spinners"));
const Switches = React.lazy(() => import("./views/Base/Switches"));

const Tabs = React.lazy(() => import("./views/Base/Tabs"));
const Tooltips = React.lazy(() => import("./views/Base/Tooltips"));
const BrandButtons = React.lazy(() => import("./views/Buttons/BrandButtons"));
const ButtonDropdowns = React.lazy(() =>
  import("./views/Buttons/ButtonDropdowns")
);
const ButtonGroups = React.lazy(() => import("./views/Buttons/ButtonGroups"));
const Buttons = React.lazy(() => import("./views/Buttons/Buttons"));
const Charts = React.lazy(() => import("./views/Charts"));
const DashboardCoreUI = React.lazy(() => import("./views/Dashboard"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const DashboardRecruiter = React.lazy(() =>
  import("./components/DashboardRecruiter/DashboardRecruiter")
);
const CoreUIIcons = React.lazy(() => import("./views/Icons/CoreUIIcons"));
const Flags = React.lazy(() => import("./views/Icons/Flags"));
const FontAwesome = React.lazy(() => import("./views/Icons/FontAwesome"));
const SimpleLineIcons = React.lazy(() =>
  import("./views/Icons/SimpleLineIcons")
);
const Alerts = React.lazy(() => import("./views/Notifications/Alerts"));
const Badges = React.lazy(() => import("./views/Notifications/Badges"));
const Modals = React.lazy(() => import("./views/Notifications/Modals"));
const Colors = React.lazy(() => import("./views/Theme/Colors"));
const Typography = React.lazy(() => import("./views/Theme/Typography"));
const Widgets = React.lazy(() => import("./views/Widgets/Widgets"));
// const Users = React.lazy(() => import('./views/Users/Users'));
// const User = React.lazy(() => import("./views/Users/User"));

const Users = React.lazy(() => import("./components/Users"));
const UserProfile = React.lazy(() => import("./components/User/Profile"));
const Candidates = React.lazy(() =>
  import("./components/Candidates/Candidates")
);
const CandidateCreate = React.lazy(() =>
  import("./components/Candidate/Create/Create")
);
const CandidateEdit = React.lazy(() =>
  import("./components/Candidate/Edit/Edit")
);
const CandidateProfile = React.lazy(() =>
  import("./components/Candidate/Profile/Profile")
);
const Companies = React.lazy(() => import("./components/Companies/Companies"));
const CompanyProfile = React.lazy(() =>
  import("./components/Company/Profile/Profile")
);
const CompanyCreate = React.lazy(() =>
  import("./components/Company/Create/Create")
);
const Vacancies = React.lazy(() => import("./components/Vacancies/Vacancies"));
const VacancyProfile = React.lazy(() =>
  import("./components/Vacancy/Profile/Profile")
);
const VacancyCreate = React.lazy(() =>
  import("./components/Vacancy/Create/Create")
);
const VacancyEdit = React.lazy(() => import("./components/Vacancy/Edit/Edit"));
const NotificationTemplates = React.lazy(() =>
  import("./components/pages/NotificationTemplates")
);
const Links = React.lazy(() => import("./components/Admin/Links/Links"));
const Platforms = React.lazy(() =>
  import("./components/Admin/Platforms/Platforms")
);
const Activity = React.lazy(() =>
  import("./components/Admin/Activity/Activity")
);
const Compose = React.lazy(() => import("./components/Email/Compose"));
const Inbox = React.lazy(() => import("./components/Email/Inbox"));
const Message = React.lazy(() => import("./components/Email/Message"));

//================================Тестирую новый компонент для роута==========================
const Results = React.lazy(() => import("./components/Results/Results"));
//================================Тестирую новый компонент для роута==========================

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", name: "Home", component: DefaultLayout, exact: true },
  {
    path: "/dashboard/coreui",
    name: "DashboardCoreUI",
    component: DashboardCoreUI
  },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/dashboardrecruiter",
    name: "Dashboard Recruiter",
    component: DashboardRecruiter
  },
  { path: "/theme", name: "Theme", component: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", component: Colors },
  { path: "/theme/typography", name: "Typography", component: Typography },
  { path: "/base", name: "Base", component: Cards, exact: true },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/carousels", name: "Carousel", component: Carousels },
  { path: "/base/collapses", name: "Collapse", component: Collapses },
  { path: "/base/dropdowns", name: "Dropdowns", component: Dropdowns },
  { path: "/base/jumbotrons", name: "Jumbotrons", component: Jumbotrons },
  { path: "/base/list-groups", name: "List Groups", component: ListGroups },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/base/paginations", name: "Paginations", component: Paginations },
  { path: "/base/popovers", name: "Popovers", component: Popovers },
  { path: "/base/progress-bar", name: "Progress Bar", component: ProgressBar },
  { path: "/base/spinners", name: "Spinners", component: SpinnersB4 },
  { path: "/base/switches", name: "Switches", component: Switches },
  { path: "/base/tabs", name: "Tabs", component: Tabs },
  { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
  { path: "/buttons", name: "Buttons", component: Buttons, exact: true },
  { path: "/buttons/buttons", name: "Buttons", component: Buttons },
  {
    path: "/buttons/button-dropdowns",
    name: "Dropdowns",
    component: ButtonDropdowns
  },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    component: ButtonGroups
  },
  {
    path: "/buttons/brand-buttons",
    name: "Brand Buttons",
    component: BrandButtons
  },
  {
    path: "/buttons/loading-buttons",
    name: "Loading Buttons",
    component: LoadingButtons
  },
  { path: "/charts", name: "Charts", component: Charts },
  { path: "/editors", name: "Editors", component: CodeEditors, exact: true },
  {
    path: "/editors/code-editors",
    name: "Code Editors",
    component: CodeEditors
  },
  {
    path: "/editors/text-editors",
    name: "Text Editors",
    component: TextEditors
  },
  { path: "/forms", name: "Forms", component: BasicForms, exact: true },
  {
    path: "/forms/advanced-forms",
    name: "Advanced Forms",
    component: AdvancedForms
  },
  { path: "/forms/basic-forms", name: "Basic Forms", component: BasicForms },
  {
    path: "/forms/validation-forms",
    name: "Form Validation",
    component: ValidationForms
  },
  { path: "/google-maps", name: "Google Maps", component: GoogleMaps },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", component: Flags },
  { path: "/icons/font-awesome", name: "Font Awesome", component: FontAwesome },
  {
    path: "/icons/simple-line-icons",
    name: "Simple Line Icons",
    component: SimpleLineIcons
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: Alerts,
    exact: true
  },
  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/badges", name: "Badges", component: Badges },
  { path: "/notifications/modals", name: "Modals", component: Modals },
  { path: "/notifications/toastr", name: "Toastr", component: Toastr },
  { path: "/plugins", name: "Plugins", component: Calendar, exact: true },
  // { path: "/plugins/calendar", name: "Calendar", component: Calendar },
  { path: "/plugins/draggable", name: "Draggable Cards", component: Draggable },
  { path: "/plugins/spinners", name: "Spinners", component: Spinners },
  { path: "/tables", name: "Tables", component: Tables, exact: true },
  { path: "/tables/data-table", name: "Data Table", component: DataTable },
  { path: "/tables/tables", name: "Tables", component: Tables },
  { path: "/widgets", name: "Widgets", component: Widgets },
  { path: "/apps", name: "Apps", component: Compose, exact: true },
  // { path: "/apps/email", name: "Email", component: Compose, exact: true },
  // { path: "/apps/email/compose", name: "Compose", component: Compose },
  // { path: "/apps/email/inbox", name: "Inbox", component: Inbox },
  // { path: "/apps/email/message", name: "Message", component: Message },
  { path: "/email", name: "Email", component: Compose, exact: true },
  { path: "/email/compose", name: "Compose", component: Compose },
  { path: "/email/inbox", name: "Inbox", component: Inbox },
  { path: "/email/message/:id", name: "Message", component: Message },
  { path: "/apps/invoicing", name: "Invoice", component: Invoice, exact: true },
  { path: "/apps/invoicing/invoice", name: "Invoice", component: Invoice },
  { path: "/users", exact: true, name: "Users", component: Users },
  // { path: "/users/:id", exact: true, name: "User Details", component: User },
  {
    path: "/users/:id",
    exact: true,
    name: "User Profile",
    component: UserProfile
  },
  {
    path: "/notification-templates",
    exact: true,
    name: "Notification Templates",
    component: NotificationTemplates
  },
  {
    path: "/candidates",
    exact: true,
    name: "Candidates",
    component: Candidates
  },
  {
    path: "/new-candidate",
    exact: true,
    name: "New Candidate",
    component: CandidateCreate
  },
  {
    path: "/candidates/:id",
    exact: true,
    name: "Candidate Profile",
    component: CandidateProfile
  },
  {
    path: "/candidates/:id/edit",
    exact: true,
    name: "Edit Candidate",
    component: CandidateEdit
  },
  {
    path: "/companies",
    exact: true,
    name: "Companies",
    component: Companies
  },
  //=======================Тестирую новый роут=========
  {
    path: "/results",
    exact: true,
    name: "Results",
    component: Results
  },
  //=======================Тестирую новый роут=========
  {
    path: "/companies/:id",
    exact: true,
    name: "Company Profile",
    component: CompanyProfile
  },
  {
    path: "/new-company",
    exact: true,
    name: "New Company",
    component: CompanyCreate
  },
  { path: "/vacancies", exact: true, name: "Vacancies", component: Vacancies },
  {
    path: "/vacancies/:id",
    exact: true,
    name: "Vacancy Profile",
    component: VacancyProfile
  },
  {
    path: "/new-vacancy",
    exact: true,
    name: "New Vacancy",
    component: VacancyCreate
  },
  {
    path: "/vacancies/:id/edit",
    exact: true,
    name: "Edit Vacancy",
    component: VacancyEdit
  },
  { path: "/calendar", name: "Calendar", component: Calendar },
  { path: "/links", exact: true, name: "Links", component: Links },
  { path: "/platforms", exact: true, name: "Platforms", component: Platforms },
  { path: "/activity", exact: true, name: "Activity", component: Activity }
];

export default routes;
