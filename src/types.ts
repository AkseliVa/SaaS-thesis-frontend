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

export interface Customer {
  customer_id: number;
  name: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  customerManager?: Employee | null;
  company_id?: number;
  projects?: Project[];
}

export interface Project {
  project_id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  active: boolean;
  company_id: number;
  customer: Customer | null;
  employees?: Employee[];
}
