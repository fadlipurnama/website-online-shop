import { useMemo } from "react";
import Button from "../Elements/Button";
import useSubTotal from "../../hooks/useCalculateSubTotal"; // Custom hook untuk hitung subtotal
import { useNavigate } from "react-router-dom";

const SummaryCartList = ({ carts }) => {
  const { calculateSubTotal } = useSubTotal();
  const navigate = useNavigate();

  // Menghitung total harga semua item di dalam keranjang
  const totalAmount = useMemo(() => {
    return carts?.reduce((total, item) => {
      const price = item.product.price;
      const discount = item.product.discount;
      const quantity = item.quantity;

      // Hitung subtotal untuk setiap item
      const subTotal = calculateSubTotal(price, discount, quantity);

      // Tambahkan subtotal dari item ini ke total keseluruhan
      return total + subTotal;
    }, 0); // 0 adalah nilai awal untuk akumulasi total
  }, [carts, calculateSubTotal]);

  // Misalkan PPN 10%
  const tax = totalAmount * 0.11;
  const totalWithTax = totalAmount + tax;

  return (
    <div className="w-full flex-1 px-2 lg:min-w-96">
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
            <p className="font-semibold">PPN (11%)</p>
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
