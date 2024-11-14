import { useEffect, useState } from "react";
import { fetchCSVData } from "../api/Api";
import CategoryAgingGraph from "../components/Reports/charts/CategoryAgingGraph";

const Reports = () => {
 const [catData,setCatDta] = useState([])
  useEffect(() => {
    const loadCSVData = async () => {
      const data = await fetchCSVData();
        console.log(data);
        setCatDta(data)
    };
    loadCSVData();
  }, []);

  

  return (
    <div className="grid grid-cols-1 gap-5 p-5">
      <CategoryAgingGraph data={catData}/>
    </div>
  );
};
export default Reports;
