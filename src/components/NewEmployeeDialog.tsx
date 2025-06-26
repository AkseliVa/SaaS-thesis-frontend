import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import type { Employee } from "../types";
import { useState } from "react";
import { addEmployee } from "../api";

function NewEmployeeDialog({ open, onClose, onEmployeeAdded }: { open: boolean, onClose: () => void, onEmployeeAdded: () => void }) {
    const [showAlert, setShowAlert] = useState(false);
    const [employee, setEmployee] = useState<Employee>({
        firstname: "",
        lastname: "",
        role: "",
        email: "",
        phone: "",
        company: {
            company_id: 1,
            name: "Hykos"
        }
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee({...employee, [event.target.name]: event.target.value});
    };

    const handleSave = async () => {
        const { firstname, lastname, role, email, phone } = employee;

        if (!firstname || !lastname || !role || !email || !phone) {
            setShowAlert(true);
            return;
        }

        setShowAlert(false); // Hide alert if previously shown
        await addEmployee(employee);
        onEmployeeAdded();
        onClose();
        setEmployee({
            firstname: "",
            lastname: "",
            role: "",
            email: "",
            phone: "",
            company: {
                company_id: 1,
                name: ""
            }
        });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add a New Employee</DialogTitle>
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
                    label="Firstname"
                    name="firstname"
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    required
                    label="Lastname"
                    name="lastname"
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    required
                    label="Role"
                    name="role"
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    required
                    label="Email"
                    name="email"
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    required
                    label="Phone"
                    name="phone"
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

export default NewEmployeeDialog;