import { Button, Dialog, DialogActions, DialogContent, DialogTitle,  InputLabel,  TextField, Typography } from "@mui/material";
import type { Employee, Project } from "../types";
import { deleteEmployee, updateEmployee } from "../api";
import { useEffect, useState } from "react";

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

function EmployeeDialog({ open, onClose, employee, projects, onEmployeeDeleted, onEmployeeUpdated }: 
    { open: boolean, onClose: () => void, employee: Employee, projects: Project[] | null, onEmployeeDeleted: () => void, onEmployeeUpdated: (updated: Employee) => void }) {
    
    const [isEdit, setIsEdit] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState<Employee>(employee);
    const [editedEmployee, setEditedEmployee] = useState<Employee>(employee);

    useEffect(() => {
        setCurrentEmployee(employee);
        setEditedEmployee(employee);
    }, [employee]);

    console.log(projects)

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
    };

    const saveEmployee = async () => {
        try {
            if (employee.employee_id !== undefined) {
                const updated = await updateEmployee(employee.employee_id, editedEmployee);
                setCurrentEmployee(updated);
                setIsEdit(false);
                onEmployeeUpdated(updated);
            } else {
                console.error("Cannot update employee: employee_id is undefined");
            }
        } catch (err) {
            console.log(err)
        }
    };

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setEditedEmployee({...editedEmployee, [event.target.name]: event.target.value});
    };
    
    return (
        <>
        <Dialog open={open} onClose={onClose}>
            {!isEdit ? (
                <>
                    <DialogTitle>{currentEmployee.firstname} {currentEmployee.lastname}</DialogTitle>
                    <DialogContent>
                        <Typography>{currentEmployee.role}</Typography>
                        <Typography>{currentEmployee.email}</Typography>
                        <Typography>{currentEmployee.phone}</Typography>
                        {currentEmployee.projects != null && currentEmployee.projects.length > 0 ? (
                            <>
                                <Typography>Projects: </Typography> 
                                {currentEmployee.projects.map((project) => (
                                    <Typography key={project.project_id}>
                                        {project.name}
                                    </Typography>
                                ))}
                            </>
                        
            ) : (
                <Typography>No projects assigned yet</Typography>
            )}
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={() => setIsEdit(true)}>Edit</Button>
                        <Button color="error" onClick={removeEmployee}>Delete</Button>
                        <Button onClick={onClose}>Close</Button>
                    </DialogActions>
                </>
            ) : (
                <>
                    <DialogTitle>Edit Employee</DialogTitle>
                    <DialogContent>
                        <TextField
                            name="firstname"
                            label="Firstname" 
                            variant="outlined"
                            value={editedEmployee.firstname}
                            onChange={handleChange}
                        />
                        <TextField
                            name="lastname"
                            label="Lastname"
                            variant="outlined"
                            value={editedEmployee.lastname}
                            onChange={handleChange}
                        />
                        <TextField 
                            name="role"
                            label="Role" 
                            variant="outlined"
                            value={editedEmployee.role}
                            onChange={handleChange}
                        />
                        <TextField
                            name="email"
                            label="Email"
                            variant="outlined"
                            value={editedEmployee.email}
                            onChange={handleChange}
                        />
                        <TextField
                            name="phone"
                            label="Phone"
                            variant="outlined"
                            value={editedEmployee.phone}
                            onChange={handleChange}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="projects-id">Projects</InputLabel>
                            <Select
                                multiple
                                labelId="projects-id"
                                value={editedEmployee.projects?.map(p => p.project_id) ?? []}
                                onChange={(e) => {
                                const selectedIds = e.target.value as number[] | undefined;
                                const selectedProjects = projects?.filter(p =>
                                    selectedIds?.includes(p.project_id)
                                ) ?? [];
                                setEditedEmployee({ ...editedEmployee, projects: selectedProjects });
                                }}
                                renderValue={(selected) => {
                                const ids = selected as number[];
                                return ids.map(id => projects?.find(p => p.project_id === id)?.name).join(", ");
                                }}
                            >
                                {projects?.map((project) => (
                                <MenuItem key={project.project_id} value={project.project_id}>
                                    {project.name}
                                </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={saveEmployee}>Save</Button>
                        <Button onClick={() => setIsEdit(false)}>Cancel</Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
        </>
    )
};

export default EmployeeDialog;