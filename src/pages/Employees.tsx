import { useEffect, useState } from "react";
import { fetchCompanies } from "../api";
import type { Company, Employee } from "../types";
import EmployeeCard from "../components/EmployeeCard";
import { Grid } from "@mui/material";
import "../styles/employees.css"
import EmployeeDialog from "../components/EmployeeDialog";

function Employees() {
    const [companyData, setCompanyData] = useState<Company[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

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

    const handleCardClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedEmployee(null);
    };

    return (
        <>
            <div className="container">
                <h1>Employees</h1>
                <Grid container spacing={20}>
                {companyData.length > 0 && 
                    companyData[0].employees?.map((employee: Employee) => {
                        return (                   
                            <EmployeeCard 
                                employee={employee}
                                onClick={() => handleCardClick(employee)}    
                            />
                        )
                    })
                }
                </Grid>

                {selectedEmployee && (
                    <EmployeeDialog 
                        open={open}
                        onClose={handleClose}
                        employee={selectedEmployee}
                    />
                )}
            </div>
        </>
    )
}

export default Employees;