const LoadingPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="w-full max-w-64 h-2 relative overflow-hidden">
        <div className="absolute w-full h-full wave-animation bg-primaryColor"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
