import { useEffect, useState } from "react";
import { fetchCSVData } from "../api/Api";
import ShippedVsReceived from "../components/Dashboard/charts/ShippedVsResived";
import StatCard from "../components/Dashboard/StatCard";
import VendorWiseQtyChart from "../components/Dashboard/charts/VendorWiseQtyChart";
import Table from "../components/Table";
import { warehouseColumns, categoryColumns } from "../common/Table";
import CategoryWiseQtyChart from "../components/Dashboard/charts/CategoryWiseQtyChart";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [warehouseData, setWarehouseData] = useState([]);
  const [vendersData, setVendersData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCSVData = async () => {
      const data = await fetchCSVData();
      console.log(data);
      calculateStats(data);
      calculateCategoryData(data);
      calculateWarehouseData(data);
      calculateVendorWaseData(data);
    };
    loadCSVData();
  }, []);

  const calculateStats = (data) => {
    const totalWarehouse = new Set(data.map((item) => item.WarehouseName)).size;
    const totalCategories = new Set(data.map((item) => item.CategoryName)).size;
    const totalProducts = new Set(data.map((item) => item.ProductName)).size;
    const totalVendors = new Set(data.map((item) => item.VendorName)).size;
    const totalShipped = data
      .filter((item) => item.Status === "Shipped")
      .reduce((sum, item) => sum + Number(item.OrderItemQuantity), 0);
    const totalReceived = data
      .filter((item) => item.Status === "Received")
      .reduce((sum, item) => sum + Number(item.OrderItemQuantity), 0);
    const totalOrders = data.length;
    const totalAvailable = data.reduce(
      (sum, item) => sum + Number(item.AvaliableQuantity),
      0
    );

    setStats([
      { id: 1, title: "Total Warehouse", value: totalWarehouse },
      { id: 2, title: "Category", value: totalCategories },
      { id: 3, title: "Products", value: totalProducts },
      { id: 4, title: "Vendors", value: totalVendors },
      { id: 5, title: "Shipped", value: totalShipped },
      { id: 6, title: "Received", value: totalReceived },
      { id: 7, title: "Orders", value: totalOrders },
      { id: 8, title: "Available", value: totalAvailable },
    ]);
  };

  const calculateCategoryData = (data) => {
    const uniqueCategories = [...new Set(data.map((item) => item.CategoryName))];
    setCategories(uniqueCategories);

    const categoryData = uniqueCategories.map((category) => {
      const categoryItems = data.filter(
        (item) => item.CategoryName === category
      );
      const totalOrderQty = categoryItems.reduce(
        (sum, item) => sum + Number(item.OrderItemQuantity),
        0
      );
      const totalAvailableQty = categoryItems.reduce(
        (sum, item) => sum + Number(item.AvaliableQuantity),
        0
      );
      const shippedQty = categoryItems
        .filter((item) => item.Status === "Shipped")
        .reduce((sum, item) => sum + Number(item.OrderItemQuantity), 0);
      const receivedQty = categoryItems
        .filter((item) => item.Status === "Received")
        .reduce((sum, item) => sum + Number(item.OrderItemQuantity), 0);
      
      return {
        category,
        totalOrderQty,
        totalAvailableQty,
        shippedQty,
        receivedQty,
      };
    });
    setCategoryData(categoryData);
  };

  const calculateWarehouseData = (data) => {
    const warehouses = [...new Set(data.map((item) => item.WarehouseName))];
    const warehouseData = warehouses.map((warehouse) => {
      const warehouseItems = data.filter(
        (item) => item.WarehouseName === warehouse
      );
      const totalOrderQty = warehouseItems.reduce(
        (sum, item) => sum + Number(item.OrderItemQuantity),
        0
      );
      const totalAvailableQty = warehouseItems.reduce(
        (sum, item) => sum + Number(item.AvaliableQuantity),
        0
      );
      const shipped = warehouseItems
        .filter((item) => item.Status === "Shipped")
        .reduce((sum, item) => sum + Number(item.OrderItemQuantity), 0);
      const received = warehouseItems
        .filter((item) => item.Status === "Received")
        .reduce((sum, item) => sum + Number(item.OrderItemQuantity), 0);
      return {
        warehouse,
        totalOrderQty,
        totalAvailableQty,
        shipped,
        received,
      };
    });
    setWarehouseData(warehouseData);
  };

  const calculateVendorWaseData = (data) => {
    const vendors = [...new Set(data.map((item) => item.VendorName))];
    const vendorsData = vendors.map((vendor) => {
      const vendorItems = data.filter((item) => item.VendorName === vendor);
      const totalOrderQty = vendorItems.reduce(
        (sum, item) => sum + Number(item.OrderItemQuantity),
        0
      );
      const totalAvailableQty = vendorItems.reduce(
        (sum, item) => sum + Number(item.AvaliableQuantity),
        0
      );

      return {
        vendor,
        totalOrderQty,
        totalAvailableQty,
      };
    });
    setVendersData(vendorsData);
  };

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item) => (
          <StatCard key={item.id} title={item.title} value={item.value} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 mt-5">
        <ShippedVsReceived data={warehouseData} />
        <VendorWiseQtyChart data={vendersData} />
        <CategoryWiseQtyChart data={categoryData} categories={categories} />
      </div>
      <div className="container mx-auto space-y-8">
        <Table
          title="Category-wise Data"
          columns={categoryColumns}
          data={categoryData}
        />
        <Table
          title="Warehouse-wise Data"
          columns={warehouseColumns}
          data={warehouseData}
        />
      </div>
    </div>
  );
};

export default Dashboard;
