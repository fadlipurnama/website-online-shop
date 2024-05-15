import { useState } from "react";
import Pagination from "./Pagination";

const Table = ({
  data,
  headers,
  handleEdit,
  handleDelete,
  handleDetailProduct,
}) => {
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
          {currentItems?.map((item, indexItem) => (
            <tr
              className="cursor-pointer hover:bg-secondaryColor"
              onClick={handleDetailProduct}
              key={`${item._id}-${indexItem}`}
            >
              {headers.map((header, indexHeader) => (
                <td
                  key={`${header._id}-${indexHeader}`}
                  className="whitespace-nowrap px-6 py-4"
                >
                  {header === "No" ? (
                    <span>{indexOfFirstItem + indexItem + 1}</span>
                  ) : header === "Image" ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-12 w-12"
                    />
                  ) : header === "Description" ? (
                    <span>{`${item.description.slice(0, 50)}...`}</span>
                  ) : header === "Action" ? (
                    <div className="flex gap-2">
                      <button
                        className="bg-primaryColor px-5  py-2 text-slate-200 hover:bg-secondaryColor"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(item.id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 p-2 text-slate-200 hover:bg-red-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    item[header.toLowerCase()]
                  )}
                </td>
              ))}
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
