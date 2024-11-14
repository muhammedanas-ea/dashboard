import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AdminLayout from "../layout/AdminLayout";
import Reports from "../pages/Reports";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
    </Routes>
  );
};
export default AdminRoutes;
