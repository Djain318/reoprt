import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Typography } from "@mui/material";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export default function BasicBars({ callData, Completion }) {
  let arrData = Completion
    ? [
        callData?.call_completion?.completed || 0,
        callData?.call_completion?.hangup || 0,
      ]
    : [
        callData?.average_call_duration || 0,
        callData?.max_call_duration || 0,
        callData?.min_call_duration || 0,
      ];

  let arrHeader = Completion
    ? ["Call Completed", "Hangup"]
    : ["Average call duration", "Max call duration", "Min call duration"];

  const chartSetting = {
    yAxis: [
      {
        label: "Time (s)",
      },
    ],
    height: 280,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-10px, 0)",
      },
    },
  };

  return (
    <>
      <Typography variant="h6" sx={{ padding: 2, fontWeight: "bold" }}>
        Call {Completion ? "Completion" : "Duration"}
      </Typography>

      <BarChart
        style={{ marginLeft: "1rem" }}
        xAxis={[
          {
            scaleType: "band",
            data: [...arrHeader],
          },
        ]}
        series={[
          {
            data: [...arrData],
          },
        ]}
        {...chartSetting}
      />
    </>
  );
}
