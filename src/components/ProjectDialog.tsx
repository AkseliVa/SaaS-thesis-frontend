import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import type { Project } from "../types";
import { deleteProject } from "../api";

function ProjectDialog({ open, onClose, project, onProjectDeleted }: { open: boolean, onClose: () => void, project: Project, onProjectDeleted: () => void }) {
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
    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{project.name}</DialogTitle>
            <DialogContent>
                <Typography>{project.description}</Typography>
                <Typography>Start: {project.startDate}</Typography>
                <Typography>End: {project.endDate}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={removeProject}>Delete</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
};

export default ProjectDialog;