const ModalEdit = ({ children, title }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="mx-4 max-h-[80vh] w-full max-w-4xl transform overflow-y-auto rounded-lg bg-white p-6 shadow-lg transition-all md:mx-0">
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default ModalEdit;
