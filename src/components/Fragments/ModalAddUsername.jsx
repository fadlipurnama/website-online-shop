import { useDispatch, useSelector } from "react-redux";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import {
  asyncUpdateUser,
  clearStatusUpdatedActionCreator,
} from "../../redux/updateUserDetail/action";

const ModalAddUsername = ({ title, prevUsername, setOpenModal }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(prevUsername);
  const { message, updateSuccess, loading } = useSelector(
    (states) => states.updateUserDetail,
  );
  const modalRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncUpdateUser({ username }));
  };

  useEffect(() => {
    if (updateSuccess) {
      dispatch(clearStatusUpdatedActionCreator());
      setOpenModal(false);
      document.body.classList.remove("overflow-hidden");
    }
  }, [dispatch, updateSuccess, setOpenModal]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpenModal(false);
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenModal(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenModal]);

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[99] flex w-full bg-black/70">
      <div
        ref={modalRef}
        className="m-auto grid  min-w-[200px] grid-cols-2 rounded-lg bg-white px-6 py-2 sm:min-w-[550px]"
      >
        <h1 className="mb-4 mt-2 text-base font-bold sm:text-xl">
          {title} Username
        </h1>
        <IoCloseSharp
          onClick={() => {
            setOpenModal(false);
            dispatch(clearStatusUpdatedActionCreator());
            document.body.classList.remove("overflow-hidden");
          }}
          className="mb-4 mt-2 h-6 w-6 cursor-pointer place-self-end rounded-lg bg-red-500 text-white sm:h-8 sm:w-8"
        />
        <form onSubmit={handleSubmit} className="col-span-2">
          <InputForm
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            className="py-1 sm:py-2"
          />
          <p className="col-span-2 font-light italic">
            *username minimal 6 - 10 karakter
          </p>
          <p className="col-span-2 text-wrap text-red-500">{message}</p>
          <Button
            type="submit"
            className="col-span-2 mb-3 mt-3 py-1 text-sm sm:mt-2 sm:py-2 sm:text-base"
          >
            {loading ? "Sedang diproses..." : "SIMPAN"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ModalAddUsername;
