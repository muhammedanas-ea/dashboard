import ApexCharts from "apexcharts";
import { useEffect } from "react";
import PropTypes from "prop-types";

const VendorWiseQtyChart = ({ data }) => {
  const options = {
    chart: {
      type: "area",
      height: "230px",
      width: "100%",
      fontFamily: "DM Sans, sans-serif",
      dropShadow: { enabled: false },
      toolbar: { show: false },
    },
    xaxis: {
      show: true,
      categories: data.map((item) => item.vendor),
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: true,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
        formatter: (value) => `${value} Qty`,
      },
    },
    series: [
      {
        name: "Total Order Qty",
        data: data.map((item) => item.totalOrderQty),
        color: "#28a745",
      },
      {
        name: "Total Available Qty",
        data: data.map((item) => item.totalAvailableQty),
        color: "#007bff",
      },
    ],
    tooltip: {
      enabled: true,
      x: { show: false },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.25,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      curve: "smooth",
      colors: ["#28a745", "#007bff"],
    },
    legend: { show: true },
    grid: { show: false },
  };

  useEffect(() => {
    const chartContainer = document.getElementById("vendor-qty-chart");
    if (chartContainer && typeof ApexCharts !== "undefined") {
      const chart = new ApexCharts(chartContainer, options);
      chart.render();
      return () => chart.destroy();
    }
  }, [data]);

  return (
    <div className="bg-white rounded-2xl shadow-sm dark:bg-[#FFFFFF] border">
      <div className="px-6 pt-6">
        <h1 className="text-base font-bold text-[#242731]">Vendor Wise</h1>
      </div>
      <div id="vendor-qty-chart" className="px-3 pt-2 pb-3" />
    </div>
  );
};

VendorWiseQtyChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      vendors: PropTypes.string.isRequired,
      totalOrderQty: PropTypes.number.isRequired,
      totalAvailableQty: PropTypes.number.isRequired,
    })
  ),
};

export default VendorWiseQtyChart;
