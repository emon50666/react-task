import { useState, useEffect } from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SlArrowLeft,SlArrowRight } from "react-icons/sl";


const CustomTable = () => {
  const [data, setData] = useState([]); // Table data
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const [totalItems, setTotalItems] = useState(0); // Total items count

  const fetchData = async (page = 1, query = "") => {
    try {
      const response = await fetch(
        `https://api.razzakfashion.com/?paginate=${rowsPerPage}&page=${page}&search=${query}`
      );
      const result = await response.json();
      console.log("API Response:", result); 

      setData(result.data || []); // Update table data
      setTotalPages(result.last_page || 1);
      setTotalItems(result.total || 0); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, searchQuery);
  }, [currentPage, searchQuery, rowsPerPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to the first page
  };

  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className="p-4 bg-black rounded-md text-gray-400">
      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search area"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-700 bg-black p-2 outline-none text-white rounded w-64"
        />
      </div>

      {/* Table */}
      <table className="min-w-full bg-black text-white">
        <thead>
          <tr>
            <th className="border border-gray-600 px-4 py-2 text-center">
              <input
                type="checkbox"
                className="appearance-none h-4 w-4 bg-[#1E1F22] border border-gray-600 checked:bg-green-500 checked:border-white rounded focus:outline-none"
              />
            </th>
            <th className="border border-gray-600 text-gray-400 text-start px-4 py-2">
              <div className="flex items-center gap-1">
                First Name
                <LuArrowUpDown />
                <BsThreeDotsVertical />
              </div>
            </th>
            <th className="border border-gray-600 text-gray-400 text-start px-4 py-2">
              <div className="flex items-center gap-1">
                Last Name
                <LuArrowUpDown />
                <BsThreeDotsVertical />
              </div>
            </th>
            <th className="border border-gray-600 text-gray-400 text-start px-4 py-2">
              <div className="flex items-center gap-1">
                Address
                <LuArrowUpDown />
                <BsThreeDotsVertical />
              </div>
            </th>
            <th className="border border-gray-600 text-gray-400 text-start px-4 py-2">
              <div className="flex items-center gap-1">
                State
                <LuArrowUpDown />
                <BsThreeDotsVertical />
              </div>
            </th>
            <th className="border border-gray-600 text-gray-400 text-start px-4 py-2">
              <div className="flex items-center gap-1">
                Phone Number
                <LuArrowUpDown />
                <BsThreeDotsVertical />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="bg-[#1E1F22]">
                <td className="border border-gray-600 px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    className="appearance-none h-4 w-4 bg-[#1E1F22] border border-gray-600 checked:bg-green-500 checked:border-white rounded focus:outline-none"
                  />
                </td>
                <td className="border border-gray-600 px-4 text-gray-400 py-2">{item.name}</td>
                <td className="border border-gray-600 px-4 text-gray-400 py-2">{item.last_name}</td>
                <td className="border border-gray-600 px-4 text-gray-400 py-2">{item.email}</td>
                <td className="border border-gray-600 px-4 text-gray-400 py-2">{item.state}</td>
                <td className="border border-gray-600 px-4 text-gray-400 py-2">{item.phone_number}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border px-4 py-2 text-center">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end gap-3 items-center mt-4">
        {/* Rows per page */}
        <div>
          <label className="mr-2 text-sm">Rows per page:</label>
          <select
            value={rowsPerPage}
            type='number'
            onChange={handleRowsPerPageChange}
            className="bg-gray-900 outline-none text-sm items-center mt-2 rounded px-3 py-0.5 "
            
          > 
          
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        {/* Page controls */}
        <div className="flex items-center">
          <button
            className=" mr-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
          <div className="flex items-center  ">
          | <SlArrowLeft className="items-center mt-1 text-sm "></SlArrowLeft>
          </div>
          </button>
          <span className="text-sm mt-1">
            {startRow} - {endRow} of {totalItems}
          </span>
          <button
            className="ml-2 "
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <div className="flex items-center ">
           <SlArrowRight className="items-center mt-1  "></SlArrowRight> |
          </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
