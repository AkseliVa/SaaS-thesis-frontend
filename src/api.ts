import type { Admin, Company, Customer, Project } from "./types";

const BASE_URL="http://localhost:8080"

function getCompanyId(): number {
  return Number(localStorage.getItem("companyId"));
}

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};


export async function fetchEverything(): Promise<Admin[]> {
    const response = await fetch(`${BASE_URL}/api/admins`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch all-data ${response.status}`)
    };
    return await response.json();
};

// -------------------------- COMPANY ---------------------------------

export async function fetchCompanies(): Promise<Company[]> {
    const response = await fetch(`${BASE_URL}/api/companies`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch companies ${response.status}`)
    };
    return await response.json();
};

export async function fetchCompany(): Promise<Company> {
    const id = getCompanyId();
    const response = await fetch(`${BASE_URL}/api/companies/${id}`, {
        headers: getAuthHeaders()
    });
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
        headers: getAuthHeaders(),
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
        headers: getAuthHeaders(),
        body: JSON.stringify(employee)
    });
    return await response.json();
};

export async function deleteEmployee(id: number) {
    const response = await fetch(`${BASE_URL}/api/employees/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
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
        headers: getAuthHeaders(),
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
        method: "DELETE",
        headers: getAuthHeaders()
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
        headers: getAuthHeaders(),
        body: JSON.stringify(project)
    });
    return await response.json();
};

// -------------------------- CUSTOMER ---------------------------------

export async function updateCustomer(id: number, customer: Customer) {
  const customerToSend = {
    customer_id: customer.customer_id,
    name: customer.name,
    contactPerson: customer.contactPerson,
    contactEmail: customer.contactEmail,
    contactPhone: customer.contactPhone,
    customerManager: customer.customerManager
      ? { employee_id: customer.customerManager.employee_id }
      : null,
    company_id: 1, // ✅ correct field name
    projects: []   // optional, DTO expects list
  };

  const response = await fetch(`${BASE_URL}/api/customers/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
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
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error(`Failed to delete customer ${response.status}`)
    };

    return;
};

export async function addCustomer(customer: Customer) {
  const customerToSend = {
    name: customer.name,
    contactPerson: customer.contactPerson,
    contactEmail: customer.contactEmail,
    contactPhone: customer.contactPhone,
    customerManager: customer.customerManager
      ? { employee_id: customer.customerManager.employee_id }
      : null,
    company_id: customer.company_id
  };

  const response = await fetch(`${BASE_URL}/api/customers`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(customerToSend),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err);
  }

  return await response.json();
}
