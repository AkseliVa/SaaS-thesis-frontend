import DashboardCard from "../components/DashboardCard";
import employees from "../assets/images/employees.jpg";
import projects from "../assets/images/projects.jpg";
import customers from "../assets/images/customers.jpg"
import "../styles/dashboard.css"
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchCompany } from "../api";

import type { Company } from "../types";

function Dashboard() {
    const [companyData, setCompanyData] = useState<Company>();

    useEffect(() => {
        const fetchAdminData = async() => {
            try {
                const data = await fetchCompany(1);
                setCompanyData(data);
            } catch (err) {
                console.log(err)
            }
        };
        fetchAdminData();
    }, []);

    console.log(companyData);

    return (
        <>
            {companyData && 
                <div className="container">
                    <h1 className="heading">{companyData.name}</h1>           
                    <h2>Dashboard</h2>
                    <Grid container spacing={20}>
                        <DashboardCard 
                            title="Customers" 
                            description="View, add, edit and delete your customer here"
                            image={customers}
                            link="/customers"
                        />
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
                    </Grid>
                </div>
            }
        </>
    )
}

export default Dashboard;