import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import type { Employee, Project } from "../types";

function EmployeeDialog({ open, onClose, employee }: { open: boolean, onClose: () => void, employee: Employee }) {
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
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
};

export default EmployeeDialog;