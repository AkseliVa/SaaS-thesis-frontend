import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import type { Employee, Project } from "../types";
import { deleteProject, updateProject } from "../api";
import { useEffect, useState } from "react";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function ProjectDialog({ open, onClose, project, employees, onProjectDeleted, onProjectUpdated, fromCustomer }: 
    { open: boolean, onClose: () => void, project: Project, employees: Employee[] | null, onProjectDeleted: () => void, onProjectUpdated: (updated: Project) => void, fromCustomer: boolean }) {
    
    const [isEdit, setIsEdit] = useState(false);
    const [currentProject, setCurrentProject] = useState<Project>(project);
    const [editedProject, setEditedProject] = useState<Project>(project);

    useEffect(() => {
            setCurrentProject(project);
            setEditedProject(project);
        }, [project]);
    
    const removeProject = async () => {
        try {
            if (project.project_id !== undefined) {
                await deleteProject(project.project_id);
                onProjectDeleted();
                onClose();
            } else {
                console.error("Cannot delete project: project_id is undefined");
            }
        } catch (err) {
            console.log(err)
        }
    };

    const saveProject = async () => {
            try {
                if (project.project_id !== undefined) {
                    const updated = await updateProject(project.project_id, editedProject);
                    setCurrentProject(editedProject);
                    setIsEdit(false);
                    onProjectUpdated(updated);
                } else {
                    console.error("Cannot update project: project_id is undefined");
                }
            } catch (err) {
                console.log(err)
            }
        };

        const changeProjectStatus = async (status: boolean) => {
            try {
                if (currentProject.project_id !== undefined) {
                const updated = await updateProject(currentProject.project_id, {
                    ...currentProject,
                    active: status
                });
                setCurrentProject(updated);
                onProjectUpdated(updated);
                onClose();
                } else {
                    console.error("Cannot archive project: project_id is undefined");
                }
            } catch (err) {
                console.error(err);
            }
            };

    
        const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
            setEditedProject({...editedProject, [event.target.name]: event.target.value});
        };
    
    return (
        <>
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
            {!isEdit ? (
                <>
                    <DialogTitle>{currentProject.name}</DialogTitle>
                    <DialogContent>
                        {currentProject.customer ? (
                            <Typography>{currentProject.customer.name}</Typography>
                        ) : (
                            <Typography>No customer</Typography>
                        )}
                        <Typography>{currentProject.description}</Typography>
                        <Typography>Start: {currentProject.startDate}</Typography>
                        <Typography>End: {currentProject.endDate}</Typography>
                        {currentProject.employees != null && currentProject.employees.length > 0 ? (
                            <>
                                <Typography>Workers: </Typography> 
                                {currentProject.employees.map((worker) => (
                                    <Typography key={worker.employee_id}>
                                        {worker.firstname} {worker.lastname}
                                    </Typography>
                                ))}
                            </>
                        
            ) : (
                <Typography>No workers assigned yet</Typography>
            )}
                    </DialogContent>
                    <DialogActions>
                        {!fromCustomer && (
                            <>
                                {currentProject.active == true ? (
                                    <Button color="error" onClick={() => changeProjectStatus(false)}>Archive</Button>
                                ) : (
                                    <Button color="error" onClick={() => changeProjectStatus(true)}>Activate</Button>
                                )}
                                <Button onClick={() => setIsEdit(true)}>Edit</Button>
                                <Button color="error" onClick={removeProject}>Delete</Button>
                            </>
                        )}
                        <Button onClick={onClose}>Close</Button>
                    </DialogActions>
                </>
            ) : (
                <>
                    <DialogTitle>Edit Project</DialogTitle>
                    <DialogContent>
                        <TextField
                            name="name"
                            label="Name" 
                            variant="outlined"
                            value={editedProject.name}
                            onChange={handleChange}
                        />
                        <TextField
                            multiline
                            name="description"
                            label="Description"
                            variant="outlined"
                            value={editedProject.description}
                            onChange={handleChange}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Start Date"
                                value={editedProject.startDate ? dayjs(editedProject.startDate) : null}
                                onChange={(value) => {
                                setEditedProject({
                                    ...editedProject,
                                    startDate: value ? dayjs(value).format("YYYY-MM-DD") : "",
                                });
                                }}
                                slotProps={{ textField: { fullWidth: true, margin: "dense", required: true } }}
                            />

                            <DesktopDatePicker
                                label="End Date"
                                value={editedProject.endDate ? dayjs(editedProject.endDate) : null}
                                onChange={(value) => {
                                setEditedProject({
                                    ...editedProject,
                                    endDate: value ? dayjs(value).format("YYYY-MM-DD") : "",
                                });
                                }}
                                slotProps={{ textField: { fullWidth: true, margin: "dense", required: true } }}
                            />
                        </LocalizationProvider>
                        <FormControl fullWidth>
                            <InputLabel id="employees-id">Employees</InputLabel>
                            <Select
                                multiple
                                labelId="employees-id"
                                value={editedProject.employees?.map(e => e.employee_id) ?? []}
                                onChange={(e) => {
                                const selectedIds = e.target.value as number[] | undefined;
                                const selectedEmployees = employees?.filter(e =>
                                    selectedIds?.includes(e.employee_id)
                                ) ?? [];
                                setEditedProject({ ...editedProject, employees: selectedEmployees });
                                }}
                                renderValue={(selected) => {
                                const ids = selected as number[];
                                return ids.map(id => employees?.find(e => e.employee_id === id)?.firstname).join(", ");
                                }}
                            >
                                {employees?.map((employee) => (
                                <MenuItem key={employee.employee_id} value={employee.employee_id}>
                                    {employee.firstname} {employee.lastname}
                                </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={saveProject}>Save</Button>
                        <Button onClick={() => setIsEdit(false)}>Cancel</Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
        </>
    )
};

export default ProjectDialog;