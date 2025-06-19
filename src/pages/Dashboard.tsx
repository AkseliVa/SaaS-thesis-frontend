import DashboardCard from "../components/DashboardCard";
import employees from "../assets/images/employees.jpg";
import projects from "../assets/images/projects.jpg";
import calendar from "../assets/images/calendar.jpg";

function Dashboard() {
    return (
        <>
            <h1>Dashboard</h1>
            <DashboardCard 
                title="Employees" 
                description="View, add, edit and delete your employees here"
                image={employees}
            />
            <DashboardCard
                title="Projects"
                description="View, add, edit and delete your projects here"
                image={projects}
            />
            <DashboardCard
                title="Calendar"
                description="View your calendar here"
                image={calendar}
            />
        </>
    )
}

export default Dashboard;