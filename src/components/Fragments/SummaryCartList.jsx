import Button from "../Elements/Button";
import useSubTotal from "../../hooks/useCalculateSubTotal"; // Custom hook untuk hitung subtotal
import { useNavigate } from "react-router-dom";
import useCalculateTotalAmount from "../../hooks/useCalculatedTotalEmount";

const SummaryCartList = ({ carts }) => {
  const { calculateSubTotal } = useSubTotal();
  const totalAmount = useCalculateTotalAmount(carts, calculateSubTotal)
  const navigate = useNavigate();

  
  const tax = totalAmount * 0.05;
  const totalWithTax = totalAmount + tax;

  return (
    <div className=" flex-1 px-2 min-w-full lg:min-w-0 lg:max-w-[35%]">
      <div className="bgwhite rounded border p-4 shadow">
        <h2 className="mb-4 text-base font-bold sm:text-lg md:text-xl lg:text-2xl">
          Ringkasan Belanja
        </h2>
        <div className="mb-4 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2 text-slate-800">
            <p className="font-semibold">Total</p>
            <p>
            
              {totalAmount
                ?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
                .replace(/,00$/, "")}
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 text-slate-800">
            <p className="font-semibold">PPN (5%)</p>
            <p>{tax?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
                .replace(/,00$/, "")}</p>
          </div>
          <div className="flex items-center justify-between gap-2 text-lg  font-semibold text-slate-800">
            <p className="font-semibold">Total Harga</p>
            <p className="text-primaryColor">
              {totalWithTax
                ?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
                .replace(/,00$/, "")}
            </p>
          </div>
        </div>

        <Button
          onClick={() => navigate(`/cart/checkout`)}
          className="px-3 py-2 font-semibold"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default SummaryCartList;
