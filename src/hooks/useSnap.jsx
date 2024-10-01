import { useState, useEffect } from "react";

const useSnap = () => {
  const [snap, setSnap] = useState(null);

  useEffect(() => {
    const myMidtransClientKey = import.meta.env.VITE_APP_MIDTRANS_CLIENT_KEY;
    const script = document.createElement("script");
    script.src = `${import.meta.env.VITE_APP_MIDTRANS_API_URL}/snap/snap.js`;
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.onload = () => {
      setSnap(window.snap);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapPay = (snap_token, actions) => {
    if (snap) {
      snap?.pay(snap_token, {
        onSuccess: function (result) {
          console.log("Success", result);
          actions.onSuccess(result);
        },
        onPending: function (result) {
          console.log("Pending", result);
          actions.onPending(result);
        },
        onError: function (error) {
          console.error("Error", error);
          actions.onError(error);
        },
        onClose: function () {
          actions.onClose();
        }
      });
    }
  };

  return { snapPay };
};

export default useSnap;
