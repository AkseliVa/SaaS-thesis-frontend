import DashboardCard from "../components/DashboardCard";
import employees from "../assets/images/employees.jpg";
import projects from "../assets/images/projects.jpg";
import calendar from "../assets/images/calendar.jpg";
import "../styles/dashboard.css"
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchEverything } from "../api";

import type { Admin } from "../types";

function Dashboard() {
    const [adminData, setAdminData] = useState<Admin[]>([]);

    useEffect(() => {
        const fetchAdminData = async() => {
            try {
                const data = await fetchEverything();
                setAdminData(data);
            } catch (err) {
                console.log(err)
            }
        };
        fetchAdminData();
    }, []);

    console.log(adminData);

    return (
        <>
            {adminData.length > 0 && 
                <div className="container">
                    <h1 className="heading">{adminData[0].company.name}</h1>           
                    <h2>Dashboard</h2>
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
            }
        </>
    )
}

export default Dashboard;