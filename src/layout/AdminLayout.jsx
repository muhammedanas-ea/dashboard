import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";


const AdminLayout = () => {
  return (
    <div className="bg-[#F5F5F5]">
      <div className="flex">
        <Sidebar />
        <div className="md:ml-60 w-full">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
