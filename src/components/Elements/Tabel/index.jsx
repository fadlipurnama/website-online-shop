import { useState } from "react";
import Pagination from "./pagination";

const Table = ({ data, headers, handleEdit, handleDelete }) => {
  // State untuk tracking halaman saat ini
  const [currentPage, setCurrentPage] = useState(1);

  // State untuk jumlah item per halaman
  const itemsPerPage = 5;

  // Hitung indeks awal dan akhir dari item yang akan ditampilkan di halaman ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {currentItems?.map((item, index) => (
            <tr key={item.id}>
              {headers.map((header) => (
                <td key={index} className="whitespace-nowrap px-6 py-4">
                  {header === "No" ? (
                    <span>{indexOfFirstItem + index + 1}</span>
                  ) : header === "Image" ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-12 w-12"
                    />
                  ) : header === "Description" ? (
                    <span>{`${item.description.slice(0, 50)}...`}</span>
                  ) : (
                    item[header.toLowerCase()]
                  )}
                </td>
              ))}
              <td className="whitespace-nowrap px-6 py-4">
                <button
                  className="mr-2 text-indigo-600 hover:text-indigo-900"
                  onClick={() => handleEdit(item._id)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        data={data}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Table;
