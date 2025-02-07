import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function CallTrends({ xAxisData, yAxisData }) {
  let xAxis = [0, ...xAxisData];
  let yAxis = [0, ...yAxisData];

  return (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: "1px" }}>
        Trend of Calls Received
      </h3>
      <LineChart
        xAxis={[{ data: xAxis, label: "Hours" }]}
        yAxis={[{ label: "Orders" }]}
        series={[{ data: yAxis }]}
        width={700}
        height={320}
        grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
}
