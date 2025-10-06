export type Admin = {
    admin_id?: number,
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    company: Company
};

export type Company = {
    company_id?: number,
    name: string,
    employees?: Employee[],
    projects?: Project[],
    customers?: Customer[]
};

export type Employee= {
    employee_id: number,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    role: string,
    projects?: Project[]
    company_id: number
};

export type Project = {
    project_id: number,
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    company_id: number,
    employees?: Employee[],
    active: boolean,
    customer: Customer
};

export type Customer = {
    customer_id: number,
    name: string,
    contactPerson: string,
    contactEmail: string,
    contactPhone: string,
    projects: Project[],
    customerManager: Employee,
    company_id: number
};