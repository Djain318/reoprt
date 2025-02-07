import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function CallData({ title, data }) {
  return (
    <Card>
      <CardActionArea
        sx={{
          width: "300px",
          height: "150px",
        }}
      >
        <CardContent sx={{ height: "100%" }}>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
