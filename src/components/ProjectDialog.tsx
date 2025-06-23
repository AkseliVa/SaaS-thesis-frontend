import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import type { Project } from "../types";

function ProjectDialog({ open, onClose, project }: { open: boolean, onClose: () => void, project: Project }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{project.name}</DialogTitle>
            <DialogContent>
                <Typography>{project.description}</Typography>
                <Typography>Start: {project.startDate}</Typography>
                <Typography>End: {project.endDate}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
};

export default ProjectDialog;