import { useEffect, useState } from "react";
import { fetchCompanies } from "../api";
import type { Company, Employee } from "../types";
import EmployeeCard from "../components/EmployeeCard";
import { Grid } from "@mui/material";
import "../styles/employees.css"

function Employees() {
    const [companyData, setCompanyData] = useState<Company[]>([]); 

    useEffect(() => {
        const fetchCompanyData = async() => {
            try {
                const data = await fetchCompanies();
                setCompanyData(data);
            } catch (err) {
                console.log(err)
            }
        };
        fetchCompanyData();
    }, []);
    
        console.log(companyData);

    return (
        <>
            <div className="container">
                <h1>Employees</h1>
                <Grid container spacing={20}>
                {companyData.length > 0 && 
                    companyData[0].employees?.map((employee: Employee) => {
                        return (                   
                            <EmployeeCard employee={employee} />
                        )
                    })
                }
                </Grid>
            </div>
        </>
    )
}

export default Employees;