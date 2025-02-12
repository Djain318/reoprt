import { PieChart } from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Breakdown({ sentimentData }) {
  const sdata =
    sentimentData && sentimentData.length > 0
      ? sentimentData
      : [{ id: 0, value: 1, label: "No Data" }];

  const total = sdata.reduce((sum, item) => sum + item.value, 0);

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
            data: sdata.map((item) => ({
              ...item,
              color: colorMapping[item.label] || "#d3d3d3",
            })),
            valueFormatter: (v, { dataIndex }) => {
              const percentage = (
                (sdata[dataIndex].value / total) *
                100
              ).toFixed(2);
              return `${v.value} ${percentage}%`;
            },
          },
        ]}
        height={310}
      />
    </Box>
  );
}


