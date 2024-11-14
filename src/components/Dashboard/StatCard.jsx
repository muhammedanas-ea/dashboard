import PropTypes from "prop-types";

const StatCard = ({ value, title }) => {
  return (
    <div className="rounded-2xl hover:text-gray-800 shadow-sm border p-6 transition-all duration-300 bg-white hover:bg-gray-300">
      <h1 className="font-bold text-2xl">{value}</h1>
      <h2 className="text-xl text-gray-900">{title}</h2>
    </div>
  );
};

StatCard.propTypes = {
  value: PropTypes.number,
  title: PropTypes.string,
};

export default StatCard;
