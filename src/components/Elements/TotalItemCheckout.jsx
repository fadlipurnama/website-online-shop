import { useState } from "react";
import LazyImage from "./LazyImage";
import useSubTotal from "../../hooks/useCalculateSubTotal";
import { formatCurrency } from "../../utils/formatCurrency";

const TotalItemCheckout = ({ carts }) => {
  const [openTotalItem, setOpenTotalItem] = useState(true);
  const { calculateSubTotal } = useSubTotal();

  return (
    <div className="mb-2 flex flex-col">
      <button
        onClick={() => setOpenTotalItem(!openTotalItem)}
        className={`py-1 ${openTotalItem && "font-semibold"} text-start text-slate-600 hover:font-semibold`}
      >
        Total Item {carts?.length}
      </button>
      {openTotalItem && (
        <div className="custom-scrollbar flex max-h-72 min-h-max w-full flex-col gap-2 overflow-y-auto p-2">
          {carts &&
            carts?.map((item) => (
              <div className="flex gap-5 rounded-lg border" key={item._id}>
                <LazyImage
                  src={item.product.imageUrl}
                  className="max-h-36 max-w-36"
                />
                <div className="grid grid-cols-2 flex-col gap-2 py-2">
                  <p className="col-span-2 text-lg font-bold text-slate-800 lg:text-xl">
                    {`${item.product.name.substring(0, 40)}...`}
                  </p>
                  <p className="text-base text-slate-800 lg:text-lg">
                    {item.product.brand}
                  </p>

                  <p className=" text-base font-semibold text-primaryColor lg:text-lg">{`${item.quantity} x ${formatCurrency(item.product.price)}`}</p>

                  <span>
                    <p className="text-base font-semibold text-slate-800 lg:text-lg">
                      Subtotal
                    </p>
                    <p className="order-6 text-base text-slate-800 lg:text-lg">
                      {formatCurrency(
                        calculateSubTotal(
                          item.product.price,
                          item.product.discount,
                          item.quantity,
                        ),
                      )}
                    </p>
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TotalItemCheckout;
