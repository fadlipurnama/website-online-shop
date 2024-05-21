import { FaBox, FaStar } from "react-icons/fa";

const DetailContent = ({ children }) => {
  return (
    <div className="mx-2 mb-8 gap-6 rounded-lg bg-white p-6 shadow-lg">
      <div className="grid w-full gap-x-4 p-4 lg:grid-cols-2 lg:grid-rows-4">
        {children}
      </div>
    </div>
  );
};

const Header = ({ name, imageUrl, price, brand, discount, best }) => {
  const promoPrice = price - (price * discount) / 100;
  return (
    <>
      <img
        src={imageUrl}
        alt={name}
        className="col-span-1 row-span-3 m-auto h-full max-h-96 w-full max-w-96 object-cover"
      />
      <div className="col-span-1 flex flex-col">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
          <span
            className={`rounded-full ${best ? "block" : "hidden"} bg-green-500 px-2 py-1 text-xs font-semibold text-white`}
          >
            Best
          </span>
          <span
            className={`rounded-full ${discount ? "block" : "hidden"} bg-red-500 px-2 py-1 text-xs font-semibold text-white`}
          >
            Promo {discount}%
          </span>
        </div>
        <p className={`mb-2 text-lg font-light ${brand ? "block" : "hidden"}`}>
          {brand}
        </p>
        <div className="mb-6 mt-2 flex flex-col lg:mb-0">
          <span
            className={`font-medium ${discount ? "text-base text-gray-500 line-through" : "text-lg text-gray-800"}`}
          >
            {price
              .toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })
              .replace(/,00$/, "")}
          </span>
          <span
            className={`mr-4 text-xl font-medium text-red-500 ${discount ? "block" : "hidden"}`}
          >
            {promoPrice
              .toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })
              .replace(/,00$/, "")}
          </span>
        </div>
      </div>
    </>
  );
};

const Body = ({ rating, stock, table, description, isActive }) => {
  return (
    <div className="row-span-2">
      {table && (
        <table className="mb-16 min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-5 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Rating
              </th>
              <th
                scope="col"
                className="px-5 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Stock
              </th>
              <th
                scope="col"
                className="px-5 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Produk Aktif
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="whitespace-nowrap border-l border-r px-6 py-4 text-sm text-gray-500">
                <div className="inline-flex items-center">
                  {rating}/5 <FaStar className="ml-1 text-yellow-500" />
                </div>
              </td>
              <td className="whitespace-nowrap border-r px-6 py-4 text-sm text-gray-500">
                <div className="inline-flex items-center gap-2">
                  {stock} <FaBox />
                </div>
              </td>
              <td className="whitespace-nowrap border-r px-6 py-4 text-sm text-gray-500">
                {isActive ? (
                  <span className="text-green-500">Yes</span>
                ) : (
                  <span className="text-blue-500">No</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <p className="mb-6 text-gray-700">{description}</p>
    </div>
  );
};

const Footer = ({
  createdAt,
  author,
  updatedAt,
  handleEditClick,
  handleDeleteClick,
}) => {
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  const formatTime = (date) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(date).toLocaleTimeString("id-ID", options);
  };

  function capitalizeFirstLetter(string) {
    return string
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }

  return (
    <div className="bg-white lg:col-span-2">
      <div className="flex w-full justify-end pb-2">
        <button
          onClick={handleEditClick}
          className="mr-2 rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={handleDeleteClick}
          className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      <div className="flex flex-col justify-between gap-4 border-t px-4 pt-10 lg:flex-row lg:items-end">
        <div className="flex flex-col items-start">
          <h2 className="text-xl font-bold">Dibuat</h2>
          <p className="mt-2 text-lg">
            Jam {formatTime(createdAt)} - {formatDate(createdAt)}
          </p>
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-xl font-bold">Perubahan Terakhir</h2>
          <p className="mt-2 text-lg">
            Jam {formatTime(updatedAt)} - {formatDate(updatedAt)}
          </p>
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-xl font-bold">Terakhir diubah oleh</h2>
          <p className="text-lg">{capitalizeFirstLetter(author)}</p>
        </div>
      </div>
    </div>
  );
};

DetailContent.Header = Header;
DetailContent.Body = Body;
DetailContent.Footer = Footer;

export default DetailContent;
