import { useState, useEffect } from "react";
import { fetchCompany } from "../api";
import type { Company, Customer, Project } from "../types";
import { Box, Button, Grid, Paper, Snackbar } from "@mui/material";
import ProjectCard from "../components/ProjectCard";
import ProjectDialog from "../components/ProjectDialog";
import NewProjectDialog from "../components/NewProjectDialog";
import Calendar from "./Calendar";

function Projects() {
    const [companyData, setCompanyData] = useState<Company | null>(null);
    const [customers, setCustomers] = useState<Customer[]>([]);
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
                const data = await fetchCompany();
                setCompanyData(data);
                setActiveProjects(data.projects?.filter(project => project.active === true) || []);
                setArchivedProjects(data.projects?.filter(project => !project.active) || []);
                if (data.customers != undefined) {
                    setCustomers(data.customers)
                }
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
                padding: 0,
                display: "flex"
            }}
        >
            <Paper 
                sx={{
                    flex: 1,
                    margin: 2,
                    padding: 5,

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
                            activeProjects.length > 0 ? (
                                activeProjects.map((project) => (
                                <ProjectCard
                                    key={project.project_id}
                                    project={project}
                                    onClick={() => handleCardClick(project)}
                                />
                                ))
                            ) : (
                                <h2>No Active Projects</h2>
                            )
                            ) : (
                            archivedProjects.length > 0 ? (
                                archivedProjects.map((project) => (
                                <ProjectCard
                                    key={project.project_id}
                                    project={project}
                                    onClick={() => handleCardClick(project)}
                                />
                                ))
                            ) : (
                                <h2>No Archived Projects</h2>
                            )
                            )}

                    </Grid>

                    {selectedProject && (
                        <ProjectDialog 
                            open={open}
                            onClose={handleClose}
                            project={selectedProject}
                            employees={companyData?.employees || null}
                            onProjectDeleted={() => handleProjectAdded("Project deleted successfully.")}
                            onProjectUpdated={() => {
                                setSnackbarMessage("Project updated successfully");
                                setOpenSnackbar(true);
                                setOpenSnackbar(false);
                                setTimeout(() => setOpenSnackbar(true), 0);
                            }}
                            fromCustomer={false}
                        /> 
                    )}

                    {newOpen && (
                        <NewProjectDialog 
                            open={newOpen}
                            onClose={handleNewProjectClose}
                            onProjectAdded={() => handleProjectAdded("Project added successfully.")}
                            customers={customers}

                        />
                    )}

                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={5000}
                        onClose={() => setOpenSnackbar(false)}
                        message={snackbarMessage}
                    />
                </Paper>
                <Paper 
                    sx={{
                        flex: 1,
                        margin: 2,
                        padding: 5,

                    }}
                elevation={20}
                square={false}
            >
                    <Calendar openSnackbar={openSnackbar} />
                </Paper>
            </Box>
    )
}

export default Projects;