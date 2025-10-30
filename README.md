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
    <li>CustomerDialog.tsx</li><img width="368" height="369" alt="customerDialog" src="https://github.com/user-attachments/assets/d5e021bb-b967-4549-8da4-a75b7bdf5cdb" />
    <li>DashboardCard.tsx</li>
    <li>EmployeeCard.tsx</li>
    <li>EmployeeDialog.tsx</li><img width="449" height="314" alt="employeeDialog" src="https://github.com/user-attachments/assets/7c284892-5b87-4e71-aa37-a134058d503e" />
    <li>NewCustomerDialog.tsx</li>
    <li>NewEmployeeDialog.tsx</li>
    <li>NewProjectDialog.tsx</li>
    <li>ProjectCard.tsx</li>
    <li>ProjectDialog.tsx</li><img width="406" height="341" alt="projectDialog" src="https://github.com/user-attachments/assets/fa512af0-8632-46f4-a02a-a2b0b96dfb7d" />
    <li>ProtectedRoute.tsx</li>
  </ul>
  <li>pages</li>
  <ul>
    <li><strong>Calendar.tsx</strong></li><img width="918" height="683" alt="calendar" src="https://github.com/user-attachments/assets/51382918-39f7-4188-ad74-97b4a2e2b4c1" />
    <li><strong>Customers.tsx</strong></li><img width="959" height="410" alt="customers" src="https://github.com/user-attachments/assets/39e28ed6-2476-4dcd-aa93-b5c3d9793daf" />
    <li><strong>Dashboard.tsx</strong></li><img width="959" height="414" alt="dashboard" src="https://github.com/user-attachments/assets/a5f8adfc-c3bb-454f-914f-8396464a1b52" />
    <li><strong>Employees.tsx</strong></li><img width="959" height="413" alt="employees" src="https://github.com/user-attachments/assets/b8afe72e-7f38-40c6-8028-bb812baaf8d0" />
    <li><strong>Login.tsx</strong></li><img width="947" height="413" alt="login" src="https://github.com/user-attachments/assets/5bbf9832-5597-47c1-a830-13cde2f96cdf" />
    <li><strong>Projects.tsx</strong></li><img width="947" height="413" alt="projects" src="https://github.com/user-attachments/assets/d0f7da01-b9dc-40d2-a04a-70fa8ff5dc45" />
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
