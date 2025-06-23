import { useState, useEffect } from "react";
import { fetchCompanies } from "../api";
import type { Company, Project } from "../types";
import "../styles/projects.css";
import { Grid } from "@mui/material";
import ProjectCard from "../components/ProjectCard";

function Projects() {
    const [companyData, setCompanyData] = useState<Company[]>([]); 
    
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
                            <ProjectCard project={project} />
                        )
                    })
                }
                </Grid>
            </div>
        </>
    )
}

export default Projects;