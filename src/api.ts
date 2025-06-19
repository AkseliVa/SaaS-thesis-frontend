import type { Admin } from "./types";

const BASE_URL="http://localhost:8080"

export async function getEverything(): Promise<Admin[]> {
    const response = await fetch(`${BASE_URL}/api/admins`);
    if (!response.ok) {
        throw new Error(`Failed to fetch data ${response.status}`)
    };
    return await response.json();
};