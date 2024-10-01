import { useState } from "react";

const TotalItemTransaction = ({ transactionData }) => {
  const [openTotalItem, setOpenTotalItem] = useState(false);

  const filteredProducts =
    transactionData?.products?.filter(
      (product) =>
        product.name !== "PPN" && product.name !== "Biaya Pengiriman",
    ) || [];



  return (
    <div className="mb-2 flex flex-col">
      <button
        onClick={() => setOpenTotalItem(!openTotalItem)}
        className={`py-1 ${
          openTotalItem && "font-semibold"
        } text-start text-base text-slate-600 hover:font-semibold lg:text-lg`}
      >
        Total Item {filteredProducts.length}
      </button>
      {openTotalItem && (
        <div className="custom-scrollbar max-h-44 space-y-4 overflow-y-auto px-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-md bg-gray-50 p-4"
            >
              <div>
                <h4 className="font-medium text-gray-700">{product.name}</h4>
                <p className="text-sm text-gray-500">
                  ({product.quantity}) {" "}
                  {product.price
                    ?.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                    .replace(/,00$/, "")}
                </p>
              </div>
              <div className="font-bold text-gray-800">
                {(product.price * product.quantity)
                  ?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                  .replace(/,00$/, "")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TotalItemTransaction;
