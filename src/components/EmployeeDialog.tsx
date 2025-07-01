import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import type { Employee, Project } from "../types";
import { deleteEmployee } from "../api";

function EmployeeDialog({ open, onClose, employee, onEmployeeDeleted }: { open: boolean, onClose: () => void, employee: Employee, onEmployeeDeleted: () => void }) {
    const removeEmployee = async () => {
        try {
            if (employee.employee_id !== undefined) {
                await deleteEmployee(employee.employee_id);
                onEmployeeDeleted();
                onClose();
            } else {
                console.error("Cannot delete employee: employee_id is undefined");
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{employee.firstname} {employee.lastname}</DialogTitle>
            <DialogContent>
                <Typography>{employee.role}</Typography>
                <Typography>{employee.email}</Typography>
                <Typography>{employee.phone}</Typography>
                {employee.projects && employee.projects.length > 0 ? (
                    employee.projects.map((project: Project) => (
                        <Typography>{project.name}</Typography>
                    ))
                ) : (
                    <Typography>No Projects</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={removeEmployee}>Delete</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
};

export default EmployeeDialog;