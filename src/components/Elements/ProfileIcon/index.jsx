import { LuUser2 } from "react-icons/lu";

const index = ({ text }) => {
  return (
    <div className="mx-auto hidden w-11/12 cursor-pointer flex-col items-center gap-2 border-b-2 px-5 py-3 lg:flex lg:w-max lg:flex-row-reverse">
      <LuUser2 className="h-32 w-32 rounded-full border-4 border-slate-600 text-slate-600 lg:h-10 lg:w-10" />
      {text}
    </div>
  );
};

export default index;
