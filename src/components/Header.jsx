import { CiMenuFries } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineCircle } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";

const Header = () => {
  return (
    <div className="z-30 flex px-7 py-4 justify-between items-center sticky top-0 bg-white shadow-lg">
      <div>
        <div className="flex md:hidden items-center space-x-4">
          <CiMenuFries color="#111827" size={24} />
          <div className="flex items-center gap-2">
            <MdOutlineCircle size={35} />
            <h1 className="text-2xl font-bold">Netlabs</h1>
          </div>
        </div>
      </div>
      <div className="flex space-x-5 items-center cursor-pointer ">
        <div className="flex gap-2 items-center">
          <TfiEmail size={23} color="#5A57FE" />
          <IoMdNotificationsOutline size={23} color="#5A57FE" />
        </div>
        <div className="w-10 h-10 rounded-full">
          <img
            className="w-full h-full object-cover rounded-full"
            src="data:image/jpeg;base64,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"
            alt="profile"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
