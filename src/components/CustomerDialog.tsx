import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import type { Customer, Employee } from "../types";
import { deleteCustomer, updateCustomer } from "../api";
import { useEffect, useState } from "react";

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
  employees: Employee[] | undefined
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer>(customer);
  const [editedCustomer, setEditedCustomer] = useState<Customer>(customer);
  const [customerManager, setCustomerManager] = useState("No customer manager");

  useEffect(() => {
    setCurrentCustomer(customer);
    setEditedCustomer(customer);

    if (customer.customerManager) {
      setCustomerManager(
        `${customer.customerManager.firstname} ${customer.customerManager.lastname}`
      );
    } else {
      setCustomerManager("No customer manager");
    }
  }, [customer]);

  const removeCustomer = async () => {
    try {
      if (customer.customer_id !== undefined) {
        await deleteCustomer(customer.customer_id);
        onCustomerDeleted();
        onClose();
      } else {
        console.error("Cannot delete customer: customer_id is undefined");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveCustomer = async () => {
    console.log("Sending customer update:", JSON.stringify(editedCustomer, null, 2));
    try {
      if (customer.customer_id !== undefined) {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCustomer({ ...editedCustomer, [event.target.name]: event.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {!isEdit ? (
        <>
          <DialogTitle>{currentCustomer.name}</DialogTitle>
          <DialogContent>
            <Typography>Customer Manager: {customerManager}</Typography>
            <Typography>Contact Person: {currentCustomer.contactPerson}</Typography>
            <Typography>Email: {currentCustomer.contactEmail}</Typography>
            <Typography>Phone: {currentCustomer.contactPhone}</Typography>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={() => setIsEdit(true)}>
              Edit
            </Button>
            <Button color="error" onClick={removeCustomer}>
              Delete
            </Button>
            <Button onClick={onClose}>Close</Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              name="name"
              label="Name"
              variant="outlined"
              value={editedCustomer.name}
              onChange={handleChange}
            />
            <Autocomplete
                options={employees}
                getOptionLabel={option => `${option.firstname} ${option.lastname}`}
                value={customer.customerManager}
                onChange={(_, newValue) =>
                        setEditedCustomer({ ...editedCustomer, customerManager: newValue })
                    }
                renderInput={params => <TextField {...params} label="Customer Manager" />}
            />
            <TextField
              fullWidth
              margin="dense"
              name="contactPerson"
              label="Contact Person"
              variant="outlined"
              value={editedCustomer.contactPerson}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="dense"
              name="contactEmail"
              label="Contact Email"
              variant="outlined"
              value={editedCustomer.contactEmail}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="dense"
              name="contactPhone"
              label="Contact Phone"
              variant="outlined"
              value={editedCustomer.contactPhone}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={saveCustomer}>Save</Button>
            <Button onClick={() => setIsEdit(false)}>Cancel</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default CustomerDialog;
