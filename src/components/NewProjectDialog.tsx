import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import type { Project } from "../types";
import { useState } from "react";
import { addProject } from "../api";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function NewProjectDialog({ open, onClose, onProjectAdded }: { open: boolean, onClose: () => void, onProjectAdded: () => void }) {
    const [showAlert, setShowAlert] = useState(false);
    const [project, setProject] = useState<Project>({
        project_id: 0,
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        company_id: 1,
        active: true
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProject({...project, [event.target.name]: event.target.value});
    };

    const handleSave = async () => {
        const { name, description, startDate, endDate } = project;

        project.active = true;

        if (!name || !description || !startDate || !endDate) {
            setShowAlert(true);
            return;
        }

        setShowAlert(false);
        await addProject(project);
        onProjectAdded();
        onClose();
        setProject({
            project_id: 0,
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            company_id: 1,
            active: true
        });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add a New Project</DialogTitle>
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
                    multiline
                    margin="dense"
                    required
                    label="Description"
                    name="description"
                    onChange={handleChange}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Start Date"
                        value={project.startDate ? dayjs(project.startDate) : null}
                        onChange={(value) => {
                        setProject({
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
                        setProject({
                            ...project,
                            endDate: value ? dayjs(value).format("YYYY-MM-DD") : "",
                        });
                        }}
                        slotProps={{ textField: { fullWidth: true, margin: "dense", required: true } }}
                    />
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>

            
        </Dialog>
    )
};

export default NewProjectDialog;