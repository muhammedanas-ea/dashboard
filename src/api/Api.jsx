import axios from "axios";
import Papa from "papaparse";

const api = axios.create({
  baseURL:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSEt3gKH7EH9fbgoYLEcRtJBBZ-qj7FyoWgzpwfzqFb1npbN9Iq0tpl0G8dxzj-kw/pub?output=csv",
});

export async function fetchCSVData() {
  try {
    const response = await api.get();
    const parsedData = parseCSV(response.data);
    return parsedData;
  } catch (err) {
    console.error("Error fetching CSV data:", err);
  }
}

function parseCSV(csvText) {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  if (result.errors.length > 0) {
    console.error("Error parsing CSV:", result.errors);
  }
  return result.data;
}
