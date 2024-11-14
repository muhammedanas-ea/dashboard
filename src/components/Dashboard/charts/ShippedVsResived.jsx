import ApexCharts from "apexcharts";
import { useEffect } from "react";
import PropTypes from "prop-types";

const ShippedVsReceived = ({ data }) => {
  const options = {
    chart: {
      type: "bar",
      height: "230px",
      width: "100%",
      fontFamily: "DM Sans, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      show: true,
      categories: data.map((item) => item.warehouse),
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
        formatter: function (value) {
          return "$" + value;
        },
      },
    },
    series: [
      {
        name: "Shipped",
        data: data.map((item) => item.shipped),
        color: "#28a745",
      },
      {
        name: "Received",
        data: data.map((item) => item.received),
        color: "#007bff",
      },
    ],
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    legend: {
      show: true,
    },
    grid: {
      show: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        endingShape: "rounded",
      },
    },
  };

  useEffect(() => {
    let chart;

    if (
      document.getElementById("shipped-chart") &&
      typeof ApexCharts !== "undefined"
    ) {
      chart = new ApexCharts(document.getElementById("shipped-chart"), options);
      chart.render();
    }

    return () => {
      if (chart) chart.destroy();
    };
  }, [data]);

  return (
    <div className="bg-white rounded-2xl shadow-sm dark:bg-[#FFFFFF] border">
      <div className="px-6 pt-6">
        <h1 className="text-base font-bold text-[#242731]">
          Shipped vs Received
        </h1>
      </div>
      <div id="shipped-chart" className="px-3 pt-2 pb-3" />
    </div>
  );
};

ShippedVsReceived.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      warehouse: PropTypes.string.isRequired,
      shipped: PropTypes.number.isRequired,
      received: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ShippedVsReceived;
