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
    projects?: Project[]
};

export type Employee= {
    employee_id?: number,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    role: string,
    projects?: Project[],
    company: Company
};

export type Project = {
    project_id?: number,
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    company: Company,
    workers?: Employee[]
};