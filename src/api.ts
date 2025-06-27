import type { Admin, Company, Employee, Project } from "./types";

const BASE_URL="http://localhost:8080"

export async function fetchEverything(): Promise<Admin[]> {
    const response = await fetch(`${BASE_URL}/api/admins`);
    if (!response.ok) {
        throw new Error(`Failed to fetch all-data ${response.status}`)
    };
    return await response.json();
};

export async function fetchCompanies(): Promise<Company[]> {
    const response = await fetch(`${BASE_URL}/api/companies`);
    if (!response.ok) {
        throw new Error(`Failed to fetch companies ${response.status}`)
    };
    return await response.json();
};

export async function addEmployee(employee: Employee) {
    const response = await fetch(`${BASE_URL}/api/employees`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(employee)
    });
    return await response.json();
};

export async function addProject(project: Project) {
    const response = await fetch(`${BASE_URL}/api/projects`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(project)
    });
    return await response.json();
}