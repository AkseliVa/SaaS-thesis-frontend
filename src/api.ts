import type { Admin, Company } from "./types";

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