import React from "react";
import * as XLSX from "xlsx";

const Table = ({ title, columns, data }) => {
  const exportToExcel = () => {
    const worksheetData = data.map((row) => {
      const rowData = {};
      columns.forEach((column) => {
        rowData[column.header] = row[column.accessor];
      });
      return rowData;
    });
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title);
    XLSX.writeFile(workbook, `${title}.xlsx`);
  };

  return (
    <div className="mt-5 h-auto rounded-2xl shadow-sm bg-white border p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-base font-bold text-[#242731]">{title}</h1>
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Export to Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-sm tracking-wider">
              {columns.map((column, index) => (
                <th key={index} className="px-4 py-3 text-gray-600">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-4 py-3 text-gray-700">
                    {row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
