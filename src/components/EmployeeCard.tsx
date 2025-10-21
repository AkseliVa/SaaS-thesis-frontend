import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import type { Employee } from "../types";

function EmployeeCard({ employee, onClick }: { employee: Employee, onClick: () => void }) {
    return (
        <Card sx={{ width: 300 }} elevation={10}>
            <CardActionArea onClick={onClick}>
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