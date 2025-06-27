import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import type { Project } from "../types";
import { useState } from "react";
import { addProject } from "../api";

function NewProjectDialog({ open, onClose, onProjectAdded }: { open: boolean, onClose: () => void, onProjectAdded: () => void }) {
    const [showAlert, setShowAlert] = useState(false);
    const [project, setProject] = useState<Project>({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        company: {
            company_id: 1,
            name: ""
        }
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProject({...project, [event.target.name]: event.target.value});
    };

    const handleSave = async () => {
        const { name, description, startDate, endDate } = project;

        if (!name || !description || !startDate || !endDate) {
            setShowAlert(true);
            return;
        }

        setShowAlert(false);
        await addProject(project);
        onProjectAdded();
        onClose();
        setProject({
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            company: {
                company_id: 1,
                name: ""
            }
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
                    margin="dense"
                    required
                    label="Description"
                    name="description"
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    required
                    label="Start Date"
                    name="startDate"
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    required
                    label="End Date"
                    name="endDate"
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

export default NewProjectDialog;