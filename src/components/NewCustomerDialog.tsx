import { Alert, Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import type { Customer, Employee } from "../types";
import { useState } from "react";
import { addCustomer } from "../api";

function NewCustomerDialog({ open, onClose, onCustomerAdded, employees }: { open: boolean, onClose: () => void, onCustomerAdded: () => void, employees: Employee[] | undefined }) {
    const [showAlert, setShowAlert] = useState(false);
    const [customer, setCustomer] = useState<Customer>({
        customer_id: 0,
        name: "",
        contactPerson: "",
        contactEmail: "",
        contactPhone: "",
        customerManager: null,
        company_id: 1
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    };

    const handleSave = async () => {
        const { name, contactPerson, contactEmail, contactPhone, customerManager } = customer;

        if (!name || !contactPerson || !contactEmail || !contactPhone || !customerManager) {
            setShowAlert(true);
            return;
        }

        setShowAlert(false);
        await addCustomer(customer);
        onCustomerAdded();
        onClose();
        setCustomer({
            customer_id: 0,
            name: "",
            contactPerson: "",
            contactEmail: "",
            contactPhone: "",
            company_id: 1,
            customerManager: null
        });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add a New Customer</DialogTitle>
            <DialogContent>
                {showAlert && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        Please fill in all the fields.
                    </Alert>
                )}
                <TextField
                    fullWidth
                    margin="dense"
                    required
                    label="Name"
                    name="name"
                    onChange={handleChange}
                />
                <Autocomplete
                    options={employees}
                    getOptionLabel={option => `${option.firstname} ${option.lastname}`}
                    value={customer.customerManager}
                    onChange={(_, newValue) =>
                        setCustomer({ ...customer, customerManager: newValue })
                    }
                    renderInput={params => <TextField {...params} label="Customer Manager" />}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    required
                    label="Contact Person"
                    name="contactPerson"
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    required
                    label="Contact Email"
                    name="contactEmail"
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    required
                    label="Contact Phone"
                    name="contactPhone"
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>

            
        </Dialog>
    )
};

export default NewCustomerDialog;