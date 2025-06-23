import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import type { Employee } from "../types";
import { useState } from "react";

function NewEmployeeDialog({ open, onClose }: { open: boolean, onClose: () => void }) {
    const [employee, setEmployee] = useState<Employee>({
        firstname: "",
        lastname: "",
        role: "",
        email: "",
        phone: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee({...employee, [event.target.name]: event.target.value});
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add a New Employee</DialogTitle>
            <DialogContent>
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
                <Button>Save</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
};

export default NewEmployeeDialog;