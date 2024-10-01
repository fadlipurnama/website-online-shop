import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncGetTransactionById,
  resetTransactionData,
} from "../redux/transaction/action";
import { asyncGetOrderByUserId, resetOrderData } from "../redux/order/action";
import { asyncCreateOrder } from "../redux/order/action";
// import { useNavigate } from "react-router-dom";

const useTransactionDetail = (transactionId) => {
  const dispatch = useDispatch();
  const { transactionData, loading } = useSelector(
    (state) => state.transaction,
  );
  const { orderData } = useSelector((state) => state.order);
  // const navigate = useNavigate();

  // State untuk melacak apakah order sudah dibuat
  const [orderCreated, setOrderCreated] = useState(false);
  const [filteredOrderData, setFilteredOrderData] = useState([]);

  useEffect(() => {
    if (transactionId) {
      dispatch(asyncGetTransactionById(transactionId));
    }
    return () => {
      dispatch(resetTransactionData());
    };
  }, [transactionId, dispatch]);

  useEffect(() => {
    if (transactionData?.userId) {
      dispatch(asyncGetOrderByUserId(transactionData.userId));
    }
    return () => {
      dispatch(resetOrderData());
    };
  }, [transactionData?.userId, dispatch]);

  useEffect(() => {
    if (Array.isArray(orderData) && transactionData) {
      const existingOrder = orderData.some(
        (order) => order.transactionId === transactionData.id,
      );

      if (
        transactionData?.status === "PAID" &&
        !existingOrder &&
        !orderCreated
      ) {
        dispatch(
          asyncCreateOrder({
            grossAmount: transactionData.grossAmount,
            customerName: transactionData.customerName,
            customerEmail: transactionData.customerEmail,
            transactionId: transactionData.id,
            shippingAddress: transactionData.shippingAddress,
            shippingCourier: transactionData.shippingCourier,
            shippingService: transactionData.shippingService,
            userId: transactionData.userId,
            paymentMethod: transactionData.paymentMethod,
            products: transactionData.products,
          }),
        ).then(() => {
          setOrderCreated(true);
        });
      }
    }

    if (orderCreated) {
      if (transactionData?.userId) {
        dispatch(asyncGetOrderByUserId(transactionData.userId));
      }
    }

    if (Array.isArray(orderData) && transactionData) {
      const filterOrderData = orderData.filter(
        (order) => order.transactionId === transactionData.id,
      );
      setFilteredOrderData(filterOrderData);
    }
  }, [transactionData, orderData, dispatch, orderCreated]);

  return { transactionData, loading, filteredOrderData };
};

export default useTransactionDetail;
