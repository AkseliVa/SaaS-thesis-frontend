import { useState, useEffect } from "react";
import { fetchCompanies } from "../api";
import type { Company, Project } from "../types";
import "../styles/projects.css";
import { Box, Button, Grid, Paper, Snackbar } from "@mui/material";
import ProjectCard from "../components/ProjectCard";
import ProjectDialog from "../components/ProjectDialog";
import NewProjectDialog from "../components/NewProjectDialog";

function Projects() {
    const [companyData, setCompanyData] = useState<Company[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [newOpen, setNewOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    
    const handleCardClick = (project: Project) => {
        setSelectedProject(project);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedProject(null);
        setOpen(false);
    }
    
    useEffect(() => {
        const fetchCompanyData = async() => {
            try {
                const data = await fetchCompanies();
                setCompanyData(data);
            } catch (err) {
                console.log(err)
            }
        };
        fetchCompanyData();
    }, [openSnackbar]);
    
    console.log(companyData);

    const handleNewProjectClick = () => {
        setNewOpen(true);
    };

    const handleNewProjectClose = () => {
        setNewOpen(false);
    };

    const handleProjectAdded = (message: string) => {
        setSnackbarMessage(message);
        setOpenSnackbar(true);
    };

    return (
        <Box
            sx={{
                justifyContent: "center",
                alignItems: "center",
                margin: 10
            }}
        >
            <Paper 
                sx={{
                    padding: 10,
                    margin: 2,
                    boxSizing: "border-box"
                }}
                elevation={20}
                square={false}
            >
                    <h1>Projects</h1>
                    <Button sx={{ marginBottom: 5}} variant="contained" color="success" onClick={handleNewProjectClick}>New Project</Button>
                    <Grid container spacing={10} sx={{justifyContent: "center", margin: 2}}>
                        {companyData.length > 0 && 
                            companyData[0].projects?.map((project: Project) => {
                                return (                   
                                    <ProjectCard
                                        key={project.project_id}
                                        project={project} 
                                        onClick={() => handleCardClick(project)}   
                                    />
                                )
                            })
                        }
                    </Grid>

                    {selectedProject && (
                        <ProjectDialog 
                            open={open}
                            onClose={handleClose}
                            project={selectedProject}
                            onProjectDeleted={() => handleProjectAdded("Project deleted successfully.")}
                            onProjectUpdated={() => {
                                setSnackbarMessage("Employee updated successfully");
                                setOpenSnackbar(true);
                                setOpenSnackbar(false);
                                setTimeout(() => setOpenSnackbar(true), 0);
                            }} 
                        /> 
                    )}

                    {newOpen && (
                        <NewProjectDialog 
                            open={newOpen}
                            onClose={handleNewProjectClose}
                            onProjectAdded={() => handleProjectAdded("Project added successfully.")}
                        />
                    )}

                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={5000}
                        onClose={() => setOpenSnackbar(false)}
                        message={snackbarMessage}
                    />
                </Paper>
            </Box>
    )
}

export default Projects;