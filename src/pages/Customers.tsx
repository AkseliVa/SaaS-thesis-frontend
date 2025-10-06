import { useEffect, useState } from "react";
import { fetchCompanies } from "../api";
import type { Company, Customer } from "../types";
import { Box, Paper } from "@mui/material";

function Customers() {
    const [companyData, setCompanyData] = useState<Company[]>([]);
    const [customers, setCustomers] = useState<Customer[] | null>([]);

    useEffect(() => {
            const fetchCompanyData = async() => {
                try {
                    const data = await fetchCompanies();
                    setCompanyData(data);
                    setCustomers(data[0].customers || null)
                } catch (err) {
                    console.log(err)
                }
            };
            fetchCompanyData();
        }, []);

        console.log(customers)

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
                square={false}
            >
                <h1>Customers</h1>
                    {companyData.length > 0 && 
                        companyData[0].customers?.map((customer: Customer) => {
                            return (                   
                                <h3>{customer.name}</h3>
                            )
                        })
                    }
            </Paper>
        </Box>
    )
};

export default Customers;