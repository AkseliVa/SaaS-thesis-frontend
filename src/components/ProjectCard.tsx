import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import type { Project } from "../types";

function ProjectCard({ project, onClick }: { project: Project, onClick: () => void }) {
    return (
        <Card sx={{ width: 345 }}>
            <CardActionArea onClick={onClick}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {project.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ProjectCard;