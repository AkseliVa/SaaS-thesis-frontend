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
