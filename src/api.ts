import type { Admin, Company, Customer, Project } from "./types";

const BASE_URL="http://localhost:8080"

export async function fetchEverything(): Promise<Admin[]> {
    const response = await fetch(`${BASE_URL}/api/admins`);
    if (!response.ok) {
        throw new Error(`Failed to fetch all-data ${response.status}`)
    };
    return await response.json();
};

// -------------------------- COMPANY ---------------------------------

export async function fetchCompanies(): Promise<Company[]> {
    const response = await fetch(`${BASE_URL}/api/companies`);
    if (!response.ok) {
        throw new Error(`Failed to fetch companies ${response.status}`)
    };
    return await response.json();
};

export async function fetchCompany(id: number): Promise<Company> {
    const response = await fetch(`${BASE_URL}/api/companies/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch company with id: ${id} ${response.status}`)
    };
    return await response.json();
};

// -------------------------- EMPLOYEE ---------------------------------

export async function addEmployee(employee: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    role: string;
    company_id: number;
}) {
    const response = await fetch(`${BASE_URL}/api/employees`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    });
    return await response.json();
};

export async function updateEmployee(id: number, employee:{
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    role: string;
    company_id: number;
}) {
    const response = await fetch(`${BASE_URL}/api/employees/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(employee)
    });
    return await response.json();
};

export async function deleteEmployee(id: number) {
    const response = await fetch(`${BASE_URL}/api/employees/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error(`Failed to delete employee ${response.status}`)
    };

    return;
};

// -------------------------- PROJECT ---------------------------------

export async function addProject(project: Project) {
    const response = await fetch(`${BASE_URL}/api/projects`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            ...project,
            customer: project.customer ? { customer_id: project.customer.customer_id } : null,
        })
    });
    console.log("sent project: ")
    console.log(project)
    return await response.json();
};

export async function deleteProject(id: number) {
    const response = await fetch(`${BASE_URL}/api/projects/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error(`Failed to delete project ${response.status}`)
    };

    return;
};

export async function updateProject(id: number, project: {
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    company_id: number,
    active: boolean
}) {
    const response = await fetch(`${BASE_URL}/api/projects/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(project)
    });
    return await response.json();
};

// -------------------------- CUSTOMER ---------------------------------

export async function updateCustomer(id: number, customer: Customer) {

  const customerToSend = {
    ...customer,
    company: { company_id: 1 }
  };

  const response = await fetch(`${BASE_URL}/api/customers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customerToSend),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update customer: ${errorText}`);
  }

  return await response.json();
}



export async function deleteCustomer(id: number) {
    const response = await fetch(`${BASE_URL}/api/customers/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error(`Failed to delete customer ${response.status}`)
    };

    return;
};

export async function addCustomer(customer: Customer) {
    const response = await fetch(`${BASE_URL}/api/customers`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(customer)
    });
    console.log("sent project: ")
    console.log(customer)
    return await response.json();
};