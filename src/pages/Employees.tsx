import { useEffect, useState } from "react";
import { fetchCompanies } from "../api";
import type { Company, Employee } from "../types";
import EmployeeCard from "../components/EmployeeCard";
import { Box, Button, Grid } from "@mui/material";

import EmployeeDialog from "../components/EmployeeDialog";
import NewEmployeeDialog from "../components/NewEmployeeDialog";
import Snackbar from '@mui/material/Snackbar';
import Paper from '@mui/material/Paper';

function Employees() {
    const [companyData, setCompanyData] = useState<Company[]>([]);
    const [infoOpen, setInfoOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [newOpen, setNewOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

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
    }, [openSnackbar]);
    
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

    const handleEmployeeAdded = () => {
        setOpenSnackbar(true);
    };

    return (
        <Box
            sx={{
                justifyContent: "center",
                alignItems: "center",
                margin: 10
            }}
        >
                <Paper 
                    sx={{
                        padding: 10,
                        margin: 2,
                        boxSizing: "border-box"
                    }}
                    elevation={20}
                >
                <h1>Employees</h1>
                <Button sx={{ marginBottom: 5}} variant="contained" color="success" onClick={handleNewEmployeeClick}>New Employee</Button>
                <Grid container spacing={10} sx={{justifyContent: "center", margin: 2}}>
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
                        onEmployeeAdded={handleEmployeeAdded}
                    />
                )}

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={5000}
                    onClose={() => setOpenSnackbar(false)}
                    message="New employee has been added"
                />
                </Paper>
            </Box>
    );
};

export default Employees;