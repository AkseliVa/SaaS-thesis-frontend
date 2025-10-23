// CustomerDialog.tsx (only the important parts replaced)
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EmployeeDialog from "./EmployeeDialog";
import ProjectDialog from "./ProjectDialog";
import type { Customer, Employee, Project } from "../types";
import { useEffect, useState } from "react";
import { deleteCustomer, updateCustomer } from "../api";

function CustomerDialog({
  open,
  onClose,
  customer,
  onCustomerDeleted,
  onCustomerUpdated,
  employees
}: {
  open: boolean;
  onClose: () => void;
  customer: Customer;
  onCustomerDeleted: () => void;
  onCustomerUpdated: (updated: Customer) => void;
  employees: Employee[] | undefined;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer>(customer);
  const [editedCustomer, setEditedCustomer] = useState<Customer>(customer);
  const [customerManagerLabel, setCustomerManagerLabel] = useState("No customer manager");

  const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setCurrentCustomer(customer);
    setEditedCustomer(customer);
    setCustomerManagerLabel(
      customer?.customerManager
        ? `${customer.customerManager.firstname} ${customer.customerManager.lastname}`
        : "No customer manager"
    );
  }, [customer, open]);

  const saveCustomer = async () => { 
    console.log("Sending customer update:", JSON.stringify(editedCustomer, null, 2)); 
    try { if (customer.customer_id !== undefined) { 
      const updated = await updateCustomer(customer.customer_id, editedCustomer); 
      setCurrentCustomer(updated); 
      setIsEdit(false); 
      onCustomerUpdated(updated); 
    } else { 
      console.error("Cannot update customer: customer_id is undefined"); 
    } 
  } catch (err) { 
    console.log(err); 
  } 
};

  const handleManagerUpdated = (updatedEmployee: Employee) => {
    console.log("Manager updated callback in CustomerDialog, got:", updatedEmployee);

    const updatedCustomer = {
      ...currentCustomer,
      customerManager: updatedEmployee,
    };
    setCurrentCustomer(updatedCustomer);
    setEditedCustomer((prev) => ({ ...prev, customerManager: updatedEmployee }));

    setCustomerManagerLabel(`${updatedEmployee.firstname} ${updatedEmployee.lastname}`);

    const notifyCustomer = {
      ...updatedCustomer,
    } as Customer;
    onCustomerUpdated(notifyCustomer);
  };

  const handleProjectUpdated = (updatedProject: Project) => {
    const updatedProjects = currentCustomer.projects?.map((p) =>
      p.project_id === updatedProject.project_id ? updatedProject : p
    );
    const updatedCustomer = { ...currentCustomer, projects: updatedProjects };
    setCurrentCustomer(updatedCustomer);
    setEditedCustomer({ ...editedCustomer, projects: updatedProjects });
    onCustomerUpdated(updatedCustomer);
  };

  const removeCustomer = async () => { 
    try { 
      if (customer.customer_id !== undefined) { 
        await deleteCustomer(customer.customer_id); 
        onCustomerDeleted(); 
        onClose(); } else { 
          console.error("Cannot delete customer: customer_id is undefined"); 
        } 
      } catch (err) { 
        console.log(err); 
      } 
    };
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {!isEdit ? (
        <>
          <DialogTitle>{currentCustomer.name}</DialogTitle>
          <DialogContent>
            <Typography variant="h3" sx={{ display: "flex", alignItems: "center" }}>
              Customer Manager:&nbsp; <Typography>{customerManagerLabel}</Typography>
              {currentCustomer.customerManager && (
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => setEmployeeDialogOpen(true)}
                  sx={{ ml: 1 }}
                >
                  <InfoIcon />
                </IconButton>
              )}
            </Typography>

            <Typography variant="h3" sx={{display: "flex"}}>Contact Person: <Typography>{currentCustomer.contactPerson}</Typography></Typography>
            <Typography variant="h3" sx={{display: "flex"}}>Email: <Typography>{currentCustomer.contactEmail}</Typography></Typography>
            <Typography variant="h3" sx={{display: "flex"}}>Phone: <Typography>{currentCustomer.contactPhone}</Typography></Typography>

            {currentCustomer.projects && currentCustomer.projects.length > 0 ? (
            <>
              <Typography variant="h3">Projects:</Typography>
              {currentCustomer.projects.map((project) => (
                <Typography
                  key={project.project_id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: project.active ? "none" : "line-through",
                  }}
                >
                  {project.name}
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => {
                      setSelectedProject(project);
                      setProjectDialogOpen(true);
                    }}
                    sx={{ ml: 1 }}
                  >
                    <InfoIcon />
                  </IconButton>
                </Typography>
              ))}
            </>
          ) : (
            <Typography>No projects assigned yet</Typography>
          )}

          </DialogContent>

          <DialogActions>
            <Button color="secondary" onClick={() => setIsEdit(true)}>Edit</Button>
            <Button color="error" onClick={removeCustomer}>Delete</Button>
            <Button onClick={onClose}>Close</Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogContent>
            <TextField fullWidth margin="dense" name="name" label="Name" value={editedCustomer.name}
              onChange={(e) => setEditedCustomer({ ...editedCustomer, name: e.target.value })} />

            <Autocomplete
              options={employees ?? []}
              getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
              value={editedCustomer.customerManager ?? null}
              onChange={(_, newValue) =>
                setEditedCustomer({ ...editedCustomer, customerManager: newValue ?? undefined })
              }
              renderInput={(params) => <TextField {...params} label="Customer Manager" />}
            />

            <TextField fullWidth margin="dense" name="contactPerson" label="Contact Person" value={editedCustomer.contactPerson ?? ""}
              onChange={(e) => setEditedCustomer({ ...editedCustomer, contactPerson: e.target.value })} />
            <TextField fullWidth margin="dense" name="contactEmail" label="Contact Email" value={editedCustomer.contactEmail ?? ""}
              onChange={(e) => setEditedCustomer({ ...editedCustomer, contactEmail: e.target.value })} />
            <TextField fullWidth margin="dense" name="contactPhone" label="Contact Phone" value={editedCustomer.contactPhone ?? ""}
              onChange={(e) => setEditedCustomer({ ...editedCustomer, contactPhone: e.target.value })} />
          </DialogContent>

          <DialogActions>
            <Button onClick={saveCustomer}>Save</Button>
            <Button onClick={() => setIsEdit(false)}>Cancel</Button>
          </DialogActions>
        </>
      )}

      {currentCustomer.customerManager && (
        <EmployeeDialog
          open={employeeDialogOpen}
          onClose={() => setEmployeeDialogOpen(false)}
          employee={currentCustomer.customerManager}
          projects={currentCustomer.projects || []}
          onEmployeeDeleted={() => {}}
          onEmployeeUpdated={(updatedEmployee) => {
            handleManagerUpdated(updatedEmployee);
            setEmployeeDialogOpen(false);
          }}
          fromCustomer={true}
        />
      )}

      {selectedProject && (
        <ProjectDialog
          open={projectDialogOpen}
          onClose={() => setProjectDialogOpen(false)}
          project={selectedProject}
          employees={[]}
          onProjectDeleted={() => { setProjectDialogOpen(false); }}
          onProjectUpdated={(updatedProject) => {
            handleProjectUpdated(updatedProject);
            setProjectDialogOpen(false);
          }}
          fromCustomer={true}
        />
      )}
    </Dialog>
  );
}

export default CustomerDialog;
