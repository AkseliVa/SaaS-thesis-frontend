import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import type { Employee } from "../types";

function EmployeeCard({ employee }: { employee: Employee }) {
    return (
        <Card sx={{ width: 345 }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {employee.firstname} {employee.lastname}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {employee.role}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default EmployeeCard;