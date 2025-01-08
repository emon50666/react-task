import { useState, useEffect } from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";

const CustomTable = () => {
  const [data, setData] = useState([]); // Table data
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const itemsPerPage = 5; // Number of rows per page

  const fetchData = async (page = 1, query = "") => {
    try {
      const response = await fetch(
        `https://api.razzakfashion.com/?paginate=${itemsPerPage}&page=${page}&search=${query}`
      );
      const result = await response.json();
      console.log("API Response:", result); // Log the data to verify structure

      setData(result.data || []); // Update table data
      setTotalPages(result.last_page || 1); // Update total pages
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data whenever `currentPage` or `searchQuery` changes
  useEffect(() => {
    fetchData(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query
    setCurrentPage(1); // Reset to the first page
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search area"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 p-2 rounded w-64 "
        />
      </div>

      {/* Table */}
      <table className="min-w-full  bg-black text-white">
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
                {/* Checkbox column */}
                <td className="border  border-gray-600 px-4 py-2 text-center">
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
      <div className="flex justify-end items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomTable;
