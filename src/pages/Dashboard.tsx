import DashboardCard from "../components/DashboardCard";
import employees from "../assets/images/employees.jpg";
import projects from "../assets/images/projects.jpg";
import calendar from "../assets/images/calendar.jpg";
import "../styles/dashboard.css"
import { Grid } from "@mui/material";

function Dashboard() {
    return (
        <div className="container">
            <h1 className="heading">Dashboard</h1>
            <Grid container spacing={20}>
                <DashboardCard 
                    title="Employees" 
                    description="View, add, edit and delete your employees here"
                    image={employees}
                    link="/employees"
                />
                <DashboardCard
                    title="Projects"
                    description="View, add, edit and delete your projects here"
                    image={projects}
                    link="/projects"
                />
                <DashboardCard
                    title="Calendar"
                    description="View your calendar here"
                    image={calendar}
                    link="/calendar"
                />
            </Grid>
        </div>
    )
}

export default Dashboard;