import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import type { Customer } from "../types";
import { useState } from "react";
import { addCustomer } from "../api";

function NewCustomerDialog({ open, onClose, onCustomerAdded }: { open: boolean, onClose: () => void, onCustomerAdded: () => void }) {
    const [showAlert, setShowAlert] = useState(false);
    const [customer, setCustomer] = useState<Customer>({
        customer_id: 0,
        name: "",
        contactPerson: "",
        contactEmail: "",
        contactPhone: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    };

    const handleSave = async () => {
        const { name, contactPerson, contactEmail, contactPhone } = customer;

        if (!name || !contactPerson || !contactEmail || !contactPhone) {
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
            contactPhone: ""
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
                <TextField
                    fullWidth
                    margin="dense"
                    label="Customer manager"
                    name="customerManager"
                    onChange={handleChange}
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