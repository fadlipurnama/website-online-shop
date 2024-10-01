import { FaCircle } from "react-icons/fa";

const TrackingManifest = ({ trackingData }) => {
  // Membalik array manifest agar ditampilkan dari bawah ke atas
  const reversedManifest = trackingData.manifest.reduce(
    (accumulator, current) => {
      return [current, ...accumulator];
    },
    [],
  );

  return (
    <div className="custom-scrollbar text-sm lg:text-lg flex-col flex max-h-[60vh] min-w-fullj ustify-end overflow-y-auto py-2">
      {reversedManifest.map((item, index) => {
        // Tentukan kelas lingkaran dan posisi berdasarkan manifest_code
        const circleClass =
          item.manifest_code === "DELIVERED"
            ? "text-primaryColor absolute -left-[1.5px] top-0 h-6 w-6 -translate-x-1/2"
            : item.manifest_code === "PICKREQ"
              ? "text-gray-200 absolute -left-[1.5px] bottom-0 h-6 w-6 -translate-x-1/2"
              : "text-gray-200 absolute -left-[1.5px] top-0 h-6 w-6 -translate-x-1/2";

        return (
          <div
            key={index}
            className={`flex w-full  items-center 
              ${item.manifest_code === "DELIVERED" ? "text-primaryColor" : ""}
              `}
          >
            <div className="flex min-h-full max-w-28 lg:max-w-none lg:min-w-36 xl:min-w-48 items-center lg:px-4 py-2">
              <p>
                {item.manifest_date} {item.manifest_time}
              </p>
            </div>
            <div className="relative min-h-full flex-1 border-l-4 px-4 py-4">
              <FaCircle className={circleClass} />
              <p>{item.manifest_description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackingManifest;
