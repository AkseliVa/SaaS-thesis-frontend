import DashboardCard from "../components/DashboardCard";
import employees from "../assets/images/employees.jpg";
import projects from "../assets/images/projects.jpg";
import customers from "../assets/images/customers.jpg"
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchCompany } from "../api";

import type { Company } from "../types";

function Dashboard() {
    const [companyData, setCompanyData] = useState<Company>();

    useEffect(() => {
        const fetchAdminData = async() => {
            try {
                const data = await fetchCompany();
                setCompanyData(data);
            } catch (err) {
                console.log(err)
            }
        };
        fetchAdminData();
    }, []);

    console.log(companyData);

    return (
        <Box
            sx={{
                justifyContent: "center",
                alignItems: "center",
                padding: 6,
                paddingTop: 2,
                paddingLeft: 10
            }}
        >
            {companyData && 
                <div className="container">
                    <Typography variant="h1">{companyData.name}</Typography>           
                    <Typography variant="h2">Dashboard</Typography>
                    <Grid container spacing={5}>
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
                            description="View, add, edit, delete and manage your projects here"
                            image={projects}
                            link="/projects"
                        />
                    </Grid>
                </div>
            }
        </Box>
    )
}

export default Dashboard;