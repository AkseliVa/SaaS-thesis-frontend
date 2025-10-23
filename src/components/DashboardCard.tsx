import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router";

function DashboardCard({ title, description, image, link }: { title: string, description: string, image: string, link: string }) {
    return (
        <Link to={link}>
        <Card sx={{ width: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                    sx={{borderRadius: 1}}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        </Link>
    );
}

export default DashboardCard;