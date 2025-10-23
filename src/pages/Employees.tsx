import { useEffect, useState } from "react";
import { fetchCompany } from "../api";
import type { Company, Employee } from "../types";
import EmployeeCard from "../components/EmployeeCard";
import { Box, Button, Grid } from "@mui/material";
import EmployeeDialog from "../components/EmployeeDialog";
import NewEmployeeDialog from "../components/NewEmployeeDialog";
import Snackbar from '@mui/material/Snackbar';
import Paper from '@mui/material/Paper';

function Employees() {
    const [companyData, setCompanyData] = useState<Company>();
    const [infoOpen, setInfoOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [newOpen, setNewOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    useEffect(() => {
        const fetchCompanyData = async() => {
            try {
                const data = await fetchCompany();
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

    const handleEmployeeAdded = (message: string) => {
        setSnackbarMessage(message)
        setOpenSnackbar(true);
    };

    return (
        <div className="employees-container">
        <Box
            sx={{
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
            }}
        >
                <Paper 
                sx={{
                    margin: -5,
                    padding: 5,
                    boxSizing: "border-box",
                    marginTop: "3rem"
                }}
                elevation={20}
                square={false}
            >
                    <h1>Employees</h1>
                    <Button sx={{ marginBottom: 5}} variant="contained" color="success" onClick={handleNewEmployeeClick}>New Employee</Button>
                    {companyData?.employees?.length === 0 || !companyData?.employees ? (
                        <h2>No employees yet</h2>
                    ) : (
                    <Grid container spacing={10} sx={{justifyContent: "center"}}>
                        {companyData != null && 
                            companyData.employees?.map((employee: Employee) => {
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
                    )}

                    {selectedEmployee && (
                        <EmployeeDialog 
                            open={infoOpen}
                            onClose={handleInfoClose}
                            employee={selectedEmployee}
                            projects={companyData?.projects || null}
                            onEmployeeDeleted={() => handleEmployeeAdded("Employee deleted successfully")}
                            onEmployeeUpdated={(updated) => {
                                setSelectedEmployee(updated)
                                setSnackbarMessage("Employee updated successfully");
                                setOpenSnackbar(true);
                                setOpenSnackbar(false);
                                setTimeout(() => setOpenSnackbar(true), 0);
                            }}
                            fromCustomer={false}
                        />
                    )}

                    {newOpen && (
                        <NewEmployeeDialog 
                            open={newOpen}
                            onClose={handleNewEmployeeClose}
                            onEmployeeAdded={() => handleEmployeeAdded("Employee added successfully")}
                        />
                    )}

                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={5000}
                        onClose={() => setOpenSnackbar(false)}
                        message={snackbarMessage}
                    />
                </Paper>
            </Box>
            </div>
    );
};

export default Employees;