import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import type { Customer } from "../types";

function CustomerCard({ customer, onClick }: { customer: Customer, onClick: () => void }) {
    return (
        <Card sx={{ width: 345 }} elevation={10}>
            <CardActionArea onClick={onClick}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {customer.name}
                    </Typography>
                    {customer.customerManager ? (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {customer.customerManager.firstname} {customer.customerManager.lastname}
                        </Typography>
                    ) : (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            No customer manager added
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CustomerCard;