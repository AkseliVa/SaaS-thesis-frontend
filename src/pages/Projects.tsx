import { useState, useEffect } from "react";
import { fetchCompanies } from "../api";
import type { Company, Project } from "../types";
import "../styles/projects.css";
import { Grid } from "@mui/material";
import ProjectCard from "../components/ProjectCard";
import ProjectDialog from "../components/ProjectDialog";

function Projects() {
    const [companyData, setCompanyData] = useState<Company[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    
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
    }, []);
    
    console.log(companyData);

    return (
        <>
            <div className="container">
                <h1>Projects</h1>
                <Grid container spacing={20}>
                {companyData.length > 0 && 
                    companyData[0].projects?.map((project: Project) => {
                        return (                   
                            <ProjectCard 
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
                    /> 
                )}
            </div>
        </>
    )
}

export default Projects;