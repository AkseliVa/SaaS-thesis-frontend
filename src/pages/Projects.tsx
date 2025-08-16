import { useState, useEffect } from "react";
import { fetchCompany } from "../api";
import type { Company, Project } from "../types";
import "../styles/projects.css";
import { Box, Button, Grid, Paper, Snackbar } from "@mui/material";
import ProjectCard from "../components/ProjectCard";
import ProjectDialog from "../components/ProjectDialog";
import NewProjectDialog from "../components/NewProjectDialog";

function Projects() {
    const [companyData, setCompanyData] = useState<Company | null>(null);
    const [archivedProjects, setArchivedProjects] = useState<Project[]>([]);
    const [showArchivedProjects, setShowArchivedProjects] = useState(false);
    const [activeProjects, setActiveProjects] = useState<Project[]>([]);
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
                const data = await fetchCompany(1);
                setCompanyData(data);
                setActiveProjects(data.projects?.filter(project => project.active === true) || []);
                setArchivedProjects(data.projects?.filter(project => !project.active) || []);
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
                    {!showArchivedProjects ? (
                        <div>
                            <Button sx={{ marginBottom: 5}} variant="contained" color="success" onClick={handleNewProjectClick}>New Project</Button>
                            <Button sx={{ marginBottom: 5, marginLeft: 5}} variant="contained" color="secondary" onClick={() => setShowArchivedProjects(true)}>Archived Projects</Button>
                        </div>
                    ) : (
                        <Button sx={{ marginBottom: 5, marginLeft: 5}} variant="contained" color="secondary" onClick={() => setShowArchivedProjects(false)}>Active Projects</Button>
                    )}
                    <Grid container spacing={10} sx={{justifyContent: "center", margin: 2}}>
                        {!showArchivedProjects ? (
                            (activeProjects?.map((project: Project) => {
                                return (                   
                                    <ProjectCard
                                        key={project.project_id}
                                        project={project} 
                                        onClick={() => handleCardClick(project)}   
                                    />
                                )
                            }))
                        ) : (
                            (archivedProjects?.map((project: Project) => {
                                return (                   
                                    <ProjectCard
                                        key={project.project_id}
                                        project={project} 
                                        onClick={() => handleCardClick(project)}   
                                    />
                                )
                            }))
                        )
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