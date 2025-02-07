import React, { useState } from "react";
import "./App.css";
import Breakdown from "./Components/Breakdown";
import CallData from "./Components/CallData";
import CallTrends from "./Components/CallTrends";
import Grid from "@mui/material/Grid2";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { dateWiseSummary } from "./util/apiHelper";
import { Button, Card, Paper } from "@mui/material";

function App() {
  const [startDate, setStartDate] = useState(dayjs().format("DD-MM-YYYY"));
  const [endDate, setEndDate] = useState(dayjs().format("DD-MM-YYYY"));
  const [xAxisData, setXAxisData] = useState([]);
  const [yAxisData, setYAxisData] = useState([]);
  const [sentimentData, setSentimentData] = useState([]);
  const [avgCallDuration, setAvgCallDuration] = useState(null);
  const [callCompletion, setCallCompletion] = useState({
    completed: 0,
    hangup: 0,
  });

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
      if (response.status && response.data.average_call_duration) {
        setAvgCallDuration(response.data.average_call_duration);
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
      minWidth={"100%"}
      padding={"1rem"}
      // sx={{
      //   width: "100vw",
      //   height: "100vh",
      //   display: "flex",
      //   flexDirection: "column",
      //   justifyContent: "space-around",
      //   alignItems: "center",
      // }}
    >
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ display: "flex",paddingLeft:"1rem" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate ? dayjs(startDate, "DD-MM-YYYY") : null}
            onChange={(newValue) =>
              setStartDate(newValue ? newValue.format("DD-MM-YYYY") : null)
            }
          />
        </LocalizationProvider>
        <Grid marginLeft={"1rem"}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DatePicker
          size="small"
            label="End Date"
            value={endDate ? dayjs(endDate, "DD-MM-YYYY") : null}
            onChange={(newValue) =>
              setEndDate(newValue ? newValue.format("DD-MM-YYYY") : null) +
              handleApiCall()
            }
          />
        </LocalizationProvider>
        </Grid>

        {/* <Button onClick={handleApiCall}>Fetch Data</Button> */}
      </Grid>

      <Grid container size={{ xs: 12, sm: 12, md: 12, lg: 12 }} justifyContent={"space-between"} padding={"1rem"} >
        <Grid item size={{ xs:78, sm: 7, md: 7, lg: 7 }} >
          <Card>
            <CallTrends xAxisData={xAxisData} yAxisData={yAxisData} />
            
          </Card>
        </Grid>

        <Grid item size={{ xs: 4, sm: 4, md: 4, lg: 4 }} >
          <Card>
            <Breakdown sentimentData={sentimentData} />
            
          </Card>
        </Grid>
      </Grid>

      <Grid
     container size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
 padding={"1rem"}  justifyContent={"space-between"}
      >
        <Grid item size={{ xs: 7, sm: 7, md: 7, lg: 7 }}>

      
        <CallData title="Average Call Duration" data={avgCallDuration} />
        </Grid>
        <Grid item size={{ xs: 4, sm: 4, md: 4, lg: 4 }}>
        <CallData
          title="Call Completion"
          data={`Completed: ${callCompletion.completed}, Hangup: ${callCompletion.hangup}`}
        />
            </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
