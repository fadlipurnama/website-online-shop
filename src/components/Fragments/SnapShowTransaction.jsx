import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSnap from "../../hooks/useSnap";
import { toggleSnapShowTrigger } from "../../redux/transaction/action";

const SnapShowTransaction = ({
  setSnapShowOpen,
  snapShowTrigger,
  transactionData,
}) => {
  const navigate = useNavigate();
  const { snapEmbed } = useSnap();
  const dispatch = useDispatch();

  useEffect(() => {
    if (snapShowTrigger && transactionData) {
      dispatch(toggleSnapShowTrigger());
      setSnapShowOpen(true);

      snapEmbed(transactionData.token, "snap-container", {
        onSuccess: function (result) {
          console.log("success", result);
          navigate(`/transaction?transactionId=${transactionData.id}`);
          setSnapShowOpen(false);
        },
        onPending: function (result) {
          console.log("pending", result);
          navigate(`/transaction?transactionId=${transactionData.id}`);
          setSnapShowOpen(false);
        },
        onClose: function () {
          navigate(`/transaction?transactionId=${transactionData.id}`);
          setSnapShowOpen(false);
        },
     
      });
    }
  }, [
    snapShowTrigger,
    transactionData,
    setSnapShowOpen,
    dispatch,
    navigate,
    snapEmbed,
  ]); // Add dependencies here

  return <div className="w-full mx-auto" id="snap-container"></div>;
};

export default SnapShowTransaction;
