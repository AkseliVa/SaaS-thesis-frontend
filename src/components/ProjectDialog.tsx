import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import type { Project } from "../types";
import { deleteProject, updateProject } from "../api";
import { useEffect, useState } from "react";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function ProjectDialog({ open, onClose, project, onProjectDeleted, onProjectUpdated }: 
    { open: boolean, onClose: () => void, project: Project, onProjectDeleted: () => void, onProjectUpdated: (updated: Project) => void }) {
    
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
                    setCurrentProject(updated);
                    setIsEdit(false);
                    onProjectUpdated(updated);
                } else {
                    console.error("Cannot update employee: employee_id is undefined");
                }
            } catch (err) {
                console.log(err)
            }
        };
    
        const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
            setEditedProject({...editedProject, [event.target.name]: event.target.value});
        };
    
    return (
        <>
        <Dialog open={open} onClose={onClose}>
            {!isEdit ? (
                <>
                    <DialogTitle>{currentProject.name}</DialogTitle>
                    <DialogContent>
                        <Typography>{currentProject.description}</Typography>
                        <Typography>Start: {currentProject.startDate}</Typography>
                        <Typography>End: {currentProject.endDate}</Typography>
                        {currentProject.workers != null && currentProject.workers.length > 0 ? (
                            <>
                                <Typography>Workers: </Typography> 
                                {currentProject.workers.map((worker) => (
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
                        <Button color="secondary" onClick={() => setIsEdit(true)}>Add workers</Button>
                        <Button onClick={() => setIsEdit(true)}>Edit</Button>
                        <Button color="error" onClick={removeProject}>Delete</Button>
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
                                value={project.startDate ? dayjs(project.startDate) : null}
                                onChange={(value) => {
                                setEditedProject({
                                    ...project,
                                    startDate: value ? dayjs(value).format("YYYY-MM-DD") : "",
                                });
                                }}
                                slotProps={{ textField: { fullWidth: true, margin: "dense", required: true } }}
                            />

                            <DesktopDatePicker
                                label="End Date"
                                value={project.endDate ? dayjs(project.endDate) : null}
                                onChange={(value) => {
                                setEditedProject({
                                    ...project,
                                    endDate: value ? dayjs(value).format("YYYY-MM-DD") : "",
                                });
                                }}
                                slotProps={{ textField: { fullWidth: true, margin: "dense", required: true } }}
                            />
                        </LocalizationProvider>
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