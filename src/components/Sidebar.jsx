import { useState } from "react";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { RiHome2Line } from "react-icons/ri";
import { MdOutlineCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { LuActivitySquare } from "react-icons/lu";
import { IoDocumentOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(0);
  const handleClick = (id) => setIsActive(id);

  const sidebarLinks = [
    {
      id: 1,
      path: "/",
      name: "Dashboard",
      icon: <RiHome2Line size={20} />,
    },
    {
      id: 2,
      path: "/",
      name: "customers",
      icon: <FaUsers size={20} />,
    },
    {
      id: 3,
      path: "/",
      name: "Activities",
      icon: <LuActivitySquare size={20} />,
    },
    {
      id: 4,
      path: "/reports",
      name: "Reports",
      icon: <IoDocumentOutline size={20} />,
    },
  ];

  return (
    <div className="h-screen hidden border-r md:flex flex-col md:w-60 fixed left-0 top-0 pt-8 px-4 bg-[#5A57FE]">
      <div className="mb-8 px-5 flex space-x-2 items-center">
        <MdOutlineCircle color="white" size={35} />
        <h1 className="text-2xl font-bold text-white">Netlabs</h1>
      </div>

      <ul className="mt-3 space-y-3">
        {sidebarLinks.map((item) => {
          return (
            <li
              key={item.id}
              className={`rounded-md py-2 px-5 hover:text-[#5F6165] ${
                isActive === item.id ? "text-[#5F6165]" : "text-[#d3d3d4]"
              }`}
              onClick={() => handleClick(item.id)}
            >
              <Link
                to={item.path}
                className="flex md:justify-start justify-center items-center md:space-x-3"
              >
                <span>{item.icon}</span>
                <span className="text-sm font-medium hidden md:flex">
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center">
        <p className="flex items-center space-x-3 py-3 px-5 cursor-pointer">
          <span>
            <IoSettingsOutline color="#d3d3d4" size={20} />
          </span>
          <span className="hidden md:flex text-sm font-medium text-[#d3d3d4]">
            Settings
          </span>
        </p>
        <p className="flex items-center space-x-3  py-3 px-5 cursor-pointer">
          <span>
            <IoLogOutOutline color="#d3d3d4" size={20} />
          </span>
          <span className="hidden md:flex text-sm font-medium text-[#d3d3d4]">
            Logout
          </span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
