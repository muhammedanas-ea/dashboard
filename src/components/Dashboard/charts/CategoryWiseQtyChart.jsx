import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ApexCharts from "apexcharts";

const CategoryWiseQtyChart = ({ data, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredData = data.filter((item) =>
    selectedCategory === "All" || item.category === selectedCategory
  );

  const options = {
    chart: {
      type: "bar",
      height: 300,
      toolbar: { show: false },
    },
    xaxis: {
      categories: filteredData.map((item) => item.category),
      labels: { style: { fontSize: "11px" } },
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value} Qty`,
      },
    },
    series: [
      {
        name: "Total Order Qty",
        data: filteredData.map((item) => item.totalOrderQty),
        color: "#28a745",
      },
      {
        name: "Total Available Qty",
        data: filteredData.map((item) => item.totalAvailableQty),
        color: "#007bff",
      },
      {
        name: "Shipped Qty",
        data: filteredData.map((item) => item.shippedQty),
        color: "#ffc107",
      },
      {
        name: "Received Qty",
        data: filteredData.map((item) => item.receivedQty),
        color: "#17a2b8",
      },
    ],
    legend: { position: "bottom" },
    dataLabels: { enabled: false },
  };

  useEffect(() => {
    const chartContainer = document.getElementById("category-qty-chart");
    if (chartContainer && typeof ApexCharts !== "undefined") {
      const chart = new ApexCharts(chartContainer, options);
      chart.render();
      return () => chart.destroy();
    }
  }, [filteredData]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Category Wise Quantities</h3>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border rounded p-2"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div id="category-qty-chart"></div>
    </div>
  );
};

CategoryWiseQtyChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      totalOrderQty: PropTypes.number.isRequired,
      totalAvailableQty: PropTypes.number.isRequired,
      shippedQty: PropTypes.number.isRequired,
      receivedQty: PropTypes.number.isRequired,
    })
  ).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CategoryWiseQtyChart;
