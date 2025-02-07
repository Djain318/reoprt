import axios from "axios";

export async function dateWiseSummary(start_date, end_date) {
  try {
    const response = await axios.post(
      "https://generativeai-api.cyntra.ai/v1/voice_order/kati_roll/datewise_summary",
      {
        start_date: start_date,
        end_date: end_date,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching date-wise summary:",
      error.response?.data || error.message
    );
    throw error;
  }
}
