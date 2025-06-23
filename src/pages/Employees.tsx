import { useEffect, useState } from "react";
import { fetchCompanies } from "../api";
import type { Company, Employee } from "../types";
import EmployeeCard from "../components/EmployeeCard";
import { Button, Grid } from "@mui/material";
import "../styles/employees.css"
import EmployeeDialog from "../components/EmployeeDialog";
import NewEmployeeDialog from "../components/NewEmployeeDialog";

function Employees() {
    const [companyData, setCompanyData] = useState<Company[]>([]);
    const [infoOpen, setInfoOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [newOpen, setNewOpen] = useState(false);

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

    const handleInfoCardClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setInfoOpen(true);
    };

    const handleInfoClose = () => {
        setInfoOpen(false);
        setSelectedEmployee(null);
    };

    const handleNewEmployeeClick = () => {
        setNewOpen(true);
    };

    const handleNewEmployeeClose = () => {
        setNewOpen(false);
    };

    return (
        <>
            <div className="container">
                <h1>Employees</h1>
                <Button onClick={handleNewEmployeeClick}>New Employee</Button>
                <Grid container spacing={20}>
                {companyData.length > 0 && 
                    companyData[0].employees?.map((employee: Employee) => {
                        return (                   
                            <EmployeeCard
                                key={employee.employee_id}
                                employee={employee}
                                onClick={() => handleInfoCardClick(employee)}    
                            />
                        )
                    })
                }
                </Grid>

                {selectedEmployee && (
                    <EmployeeDialog 
                        open={infoOpen}
                        onClose={handleInfoClose}
                        employee={selectedEmployee}
                    />
                )}

                {newOpen && (
                    <NewEmployeeDialog 
                        open={newOpen}
                        onClose={handleNewEmployeeClose}
                    />
                )}
            </div>
        </>
    )
}

export default Employees;