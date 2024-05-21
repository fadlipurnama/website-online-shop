import { useState } from "react";
import Pagination from "./Pagination";

const Table = ({ data, headers, handleDetailProduct }) => {
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
              onClick={(e) => {
                e.stopPropagation;
                handleDetailProduct(item._id);
              }}
              key={`${item._id}-${indexItem}`}
            >
              {headers.map((header, indexHeader) => (
                <td
                  key={`${header._id}-${indexHeader}`}
                  className={`whitespace-nowrap px-6 py-4 ${
                    header === "Description" ? "min-w-96" : ""
                  }`}
                >
                  {header === "No" ? (
                    <span>{indexOfFirstItem + indexItem + 1}</span>
                  ) : header === "Image" ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12"
                    />
                  ) : header === "Best" ? (
                    item.best ? (
                      <span className="ml-2 rounded-full  bg-green-500 px-2 py-1 text-xs font-semibold text-white">
                        Best
                      </span>
                    ) : (
                      <span className="flex justify-center font-semibold">-</span>
                    )
                  ) : header === "Discount" ? (
                    item.discount !== 0 ? (
                      <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                        Promo {item.discount}%
                      </span>
                    ) : (
                      <span className="flex justify-center font-semibold">-</span>
                    )
                  ) : header === "Description" ? (
                    <span className="text-wrap">{`${item.description.slice(0, 150)}...`}</span>
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
