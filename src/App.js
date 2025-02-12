import React, { useState } from "react";
import "./App.css";
import Breakdown from "./Components/Breakdown";
import CallTrends from "./Components/CallTrends";
import Grid from "@mui/material/Grid2";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { dateWiseSummary } from "./util/apiHelper";
import { Card } from "@mui/material";
import BasicBars from "./Components/Barchart";

function App() {
  const [startDate, setStartDate] = useState(dayjs().format("DD-MM-YYYY"));
  const [endDate, setEndDate] = useState(dayjs().format("DD-MM-YYYY"));
  const [xAxisData, setXAxisData] = useState([]);
  const [yAxisData, setYAxisData] = useState([]);
  const [sentimentData, setSentimentData] = useState([]);
  const [callData, setCallData] = useState(null);
  const [callCompletion, setCallCompletion] = useState({
    completed: 0,
    hangup: 0,
  });
  console.log(startDate);
  const handleApiCall = async () => {
    try {
      let response = await dateWiseSummary(startDate, endDate);
      if (response.status && response.data.call_trends_by_hour) {
        const xData = response.data.call_trends_by_hour.map((item) => {
          let a = item.hour.split(":");
          return parseInt(a[0]);
        });
        const yData = response.data.call_trends_by_hour.map(
          (item) => item.orders
        );
        setXAxisData(xData);
        setYAxisData(yData);
      }
      if (response.status && response.data.sentiment_distribution) {
        const sData = response.data.sentiment_distribution.map(
          (item, index) => ({
            id: index,
            value: item.count,
            label: item.sentiment,
          })
        );
        setSentimentData(sData);
      }
      if (response.status) {
        setCallData(response.data);
      }
      if (response.status && response.data.call_completion) {
        setCallCompletion(response.data.call_completion);
      }
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  };

  return (
    <Grid
      container
      style={{ background: "#f2f2f2" }}
      minHeight={"100vh"}
      minWidth={"100%"}
      padding={"1rem"}
    >
      <Grid container size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Grid container padding={"1rem"}>
          <div
            style={{
              padding: "1rem",
              paddingBottom: "0rem",
              paddingLeft: "0rem",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={startDate ? dayjs(startDate, "DD-MM-YYYY") : null}
                onChange={(newValue) =>
                  setStartDate(
                    newValue ? newValue.format("DD-MM-YYYY") : null
                  ) + handleApiCall()
                }
              />
            </LocalizationProvider>
          </div>
          <div style={{ padding: "1rem", paddingBottom: "0rem" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                value={endDate ? dayjs(endDate, "DD-MM-YYYY") : null}
                onChange={(newValue) =>
                  setEndDate(newValue ? newValue.format("DD-MM-YYYY") : null) +
                  handleApiCall()
                }
              />
            </LocalizationProvider>
          </div>
        </Grid>
      </Grid>

      <Grid container size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Grid item size={{ xs: 12, sm: 12, md: 7, lg: 7 }} padding={"1rem"}>
          <Card>
            <CallTrends xAxisData={xAxisData} yAxisData={yAxisData} />
          </Card>
        </Grid>

        <Grid item size={{ xs: 12, sm: 12, md: 5, lg: 5 }} padding={"1rem"}>
          <Card>
            <Breakdown sentimentData={sentimentData} />
          </Card>
        </Grid>
      </Grid>

      <Grid container size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Grid item size={{ xs: 12, sm: 12, md: 7, lg: 7 }} padding={"1rem"}>
          <Card>
            <BasicBars callData={callData} />
          </Card>
        </Grid>
        <Grid item size={{ xs: 12, sm: 12, md: 5, lg: 5 }} padding={"1rem"}>
          <Card>
            <BasicBars callData={callData} Completion={true} />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
