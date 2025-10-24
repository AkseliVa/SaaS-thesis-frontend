# Company Management Frontend

This is the **frontend** for a full-stack company management application built with **React**, **TypeScript**, and **Material UI (MUI)**.  
The app enables companies to manage their **employees, customers, and projects**, with a user-friendly interface and modern design.

---

## Key Features

- **User Authentication**
  - Secure login and registration for admins and company accounts.
  - Token-based access control with protected routes.

- **Dashboard Overview**
  - Displays key company information and quick access to sections like Employees, Customers, and Projects.

- **Customer Management**
  - Create, edit, and delete customers.
  - Assign a customer manager and view their contact information.
  - View and manage associated projects.

- **Employee Management**
  - Add, edit, and remove employees.
  - View assigned projects and customers.
  - Employee details accessible via dialog pop-ups.

- **Project Management**
  - Create, edit, and archive projects.
  - Link projects to customers and employees.
  - Track project timelines visually on a **calendar**.

- **Calendar View**
  - Interactive calendar displaying project durations and deadlines.

- **Responsive Design**
  - Built using **MUI’s Grid system** for consistent spacing and responsive layouts.
  - Supports both desktop and tablet displays.

- **Global Theme with `createTheme()`**
  - Centralized MUI theme with custom colors, typography, and component styles.

---

## Technologies Used

| Category | Technology |
|-----------|-------------|
| Framework | React + TypeScript |
| Styling | Material UI (MUI v5) |
| Routing | React Router DOM |
| State & Context | React Hooks + Local Storage |
| Date Handling | dayjs + MUI X Date Pickers |
| HTTP Requests | Fetch API (custom `api.ts`) |
| Build Tool | Vite |
| Type Safety | TypeScript Interfaces for all models |

---

## Folder Structure
<ul>
  <li>assets</li>
  <ul>
    <li>images</li>
    <ul>
      <li>images for the dashboard</li>
    </ul>
  </ul>
  <li>components</li>
  <ul>
    <li>CustomAppBar.tsx</li>
    <li>CustomerCard.tsx</li>
    <li>CustomerDialog.tsx</li>
    <li>DashboardCard.tsx</li>
    <li>EmployeeCard.tsx</li>
    <li>EmployeeDialog.tsx</li>
    <li>NewCustomerDialog.tsx</li>
    <li>NewEmployeeDialog.tsx</li>
    <li>NewProjectDialog.tsx</li>
    <li>ProjectCard.tsx</li>
    <li>ProjectDialog.tsx</li>
    <li>ProtectedRoute.tsx</li>
  </ul>
  <li>pages</li>
  <ul>
    <li>Calendar.tsx</li>
    <li>Customer.tsx</li>
    <li>Dashboard.tsx</li>
    <li>Employees.tsx</li>
    <li>Login.tsx</li>
    <li>Projects.tsx</li>
  </ul>
  <li>styles (will be deleted)</li>
  <li>api.ts (all API-fetching)</li>
  <li>main.tsx (entrypoint)</li>
  <li>theme.ts (styling theme for the app)</li>
</ul>

# Improvement ideas for the future
<ul>
  <li>When creating/adding a new employee also create a username and password for the employee</li>
  <ul>
    <li>Currently only admins can use the software, but adding in usage for regular employees with basically only view access</li>
  </ul>
  <li>Publishing</li>
  <li>Incorporating emails, so that for example when a change is made to a project a user is in they get notified</li>
  <li>"Notes" or something similiar for projects and customers</li>
  <li>Log-info for everything that happens on a companys site so that an admin can see what changes have been made and by who</li>
</ul>
