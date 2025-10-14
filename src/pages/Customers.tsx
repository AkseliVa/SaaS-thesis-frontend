import { useEffect, useState } from "react";
import { fetchCompanies } from "../api";
import type { Company, Customer } from "../types";
import { Box, Button, Grid, Paper, Snackbar } from "@mui/material";
import CustomerCard from "../components/CustomerCard";
import CustomerDialog from "../components/CustomerDialog";
import NewCustomerDialog from "../components/NewCustomerDialog";
import '../styles/customers.css'

function Customers() {
    const [companyData, setCompanyData] = useState<Company[]>([]);
    const [infoOpen, setInfoOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [newOpen, setNewOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    
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
    
        const handleInfoCardClick = (customer: Customer) => {
            setSelectedCustomer(customer);
            setInfoOpen(true);
        };
    
        const handleInfoClose = () => {
            setInfoOpen(false);
            setSelectedCustomer(null);
        };
    
        const handleNewCustomerClick = () => {
            setNewOpen(true);
        };
    
        const handleNewCustomerClose = () => {
            setNewOpen(false);
        };
    
        const handleCustomerAdded = (message: string) => {
            setSnackbarMessage(message)
            setOpenSnackbar(true);
        };

    return (
        <div className="customers-container">
        <Box
            sx={{
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
            }}
        >
            <Paper 
                sx={{
                    padding: 10,
                    boxSizing: "border-box"
                }}
                elevation={20}
                square={false}
            >
                <h1>Customers</h1>
                    <Button sx={{ marginBottom: 5}} variant="contained" color="success" onClick={handleNewCustomerClick}>New Customer</Button>
                    <Grid container spacing={10} sx={{justifyContent: "center", margin: 2}}>
                        {companyData.length > 0 && 
                            companyData[0].customers?.map((customer: Customer) => {
                                return (                   
                                    <CustomerCard
                                        key={customer.customer_id}
                                        customer={customer}
                                        onClick={() => handleInfoCardClick(customer)}    
                                    />
                                )
                            })
                        }
                    </Grid>

                    {selectedCustomer && (
                        <CustomerDialog 
                            open={infoOpen}
                            onClose={handleInfoClose}
                            customer={selectedCustomer}
                            onCustomerDeleted={() => handleCustomerAdded("Customer deleted successfully")}
                            onCustomerUpdated={(updated) => {
                                setSelectedCustomer(updated)
                                setSnackbarMessage("Customer updated successfully");
                                setOpenSnackbar(true);
                                setOpenSnackbar(false);
                                setTimeout(() => setOpenSnackbar(true), 0);
                            }}
                            employees={companyData[0].employees}
                        />
                    )}

                    {newOpen && (
                        <NewCustomerDialog 
                            open={newOpen}
                            onClose={handleNewCustomerClose}
                            onCustomerAdded={() => handleCustomerAdded("Customer added successfully")}
                            employees={companyData[0].employees}
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
    )
};

export default Customers;