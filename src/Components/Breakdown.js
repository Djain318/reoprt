import { PieChart } from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Breakdown({ sentimentData }) {
  const data =
    sentimentData && sentimentData.length > 0
      ? sentimentData
      : [{ id: 0, value: 1, label: "No Data" }];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const colorMapping = {
    Positive: "#28a745",
    Negative: "#dc3545",
    Neutral: "#f8d775",
    Null: "#d3d3d3",
  };

  return (
    <Box textAlign="">
      <Typography variant="h6" sx={{ padding: 2, fontWeight: "bold" }}>
        Sentiment Breakdown
      </Typography>
      <PieChart
        series={[
          {
            data: data.map((item, index) => ({
              ...item,
              color: colorMapping[item.label] || "#d3d3d3",
              id: item.id + index * 10, // Ensuring unique spacing
            })),
            arcLabel: (item) => `${((item.value / total) * 100).toFixed(2)}%`,
          },
        ]}
        width={450}
        height={310}
      />
    </Box>
  );
}
