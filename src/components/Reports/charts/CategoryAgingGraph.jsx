import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import PropTypes from "prop-types";

const CategoryAgingGraph = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  function calculateDaysFromToday(orderDate) {
    const today = new Date();
    const orderDateObj = new Date(orderDate);
    const timeDiff = Math.abs(today - orderDateObj);
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }

  function getAgingData(category) {
    const agingData = {
      "0-30": 0,
      "31-60": 0,
      "61-90": 0,
      "91-120": 0,
      "120+": 0,
    };

    data.forEach((item) => {
      if (item.CategoryName === category) {
        const days = calculateDaysFromToday(item.OrderDate);
        if (days <= 30) agingData["0-30"] += item.OrderItemQuantity;
        else if (days <= 60) agingData["31-60"] += item.OrderItemQuantity;
        else if (days <= 90) agingData["61-90"] += item.OrderItemQuantity;
        else if (days <= 120) agingData["91-120"] += item.OrderItemQuantity;
        else agingData["120+"] += item.OrderItemQuantity;
      }
    });

    return agingData;
  }

  useEffect(() => {
    if (selectedCategory) {
      const agingData = getAgingData(selectedCategory);
      renderChart(Object.keys(agingData), Object.values(agingData));
    }
  }, [selectedCategory]);

  const renderChart = (categories, data) => {
    const options = {
      chart: {
        type: "bar",
        height: "260px",
      },
      title: {
        text: `Inventory Aging for ${selectedCategory}`,
      },
      xaxis: {
        categories: categories,
        title: {
          text: "Days",
        },
      },
      yaxis: {
        title: {
          text: "Stock Quantity",
        },
      },
      series: [
        {
          name: "Stock Quantity",
          data: data,
        },
      ],
    };
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm dark:bg-[#FFFFFF] border">
      <div className="px-6 pt-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Select Category:
        </label>
        <select
          onChange={handleCategoryChange}
          value={selectedCategory}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Select Category</option>
          {[...new Set(data.map((item) => item.CategoryName))].map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>

        <div id="chart" className="mt-4"></div>
      </div>
    </div>
  );
};

CategoryAgingGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      CategoryName: PropTypes.string.isRequired,
      OrderDate: PropTypes.string.isRequired,
      OrderItemQuantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CategoryAgingGraph;
