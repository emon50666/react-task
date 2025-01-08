import { useState, useEffect } from "react";

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
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      {/* Table */}
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">State</th>
            <th className="border px-4 py-2">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.last_name}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.state}</td>
                <td className="border px-4 py-2">{item.phone_number}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border px-4 py-2 text-center">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
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
