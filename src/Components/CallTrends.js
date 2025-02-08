import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";

export default function CallTrends({ xAxisData, yAxisData }) {
  let xAxis = [0, ...xAxisData];
  let yAxis = [0, ...yAxisData];

  return (
    <div>
  
      <Typography variant="h6" sx={{ padding: 2, fontWeight: "bold" }}>
      Trend of Calls Received
      </Typography>
      <LineChart
        xAxis={[{ data: xAxis, label: "Hours" }]}
        yAxis={[{ label: "Orders" }]}
        series={[{ data: yAxis }]}
        width={700}
        height={310}
        grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
}
