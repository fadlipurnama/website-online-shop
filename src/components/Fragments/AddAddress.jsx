import { useEffect, useState } from "react";
import InputForm from "../Elements/Input";
import data_provinsi from "../../nama-provinsi.json";
import SelectForm from "../Elements/Select";
import Button from "../Elements/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncUpdateUser,
  clearStatusUpdatedActionCreator,
} from "../../redux/updateUserDetail/action";
import { z } from "zod";

const addressSchema = z.object({
  country: z.string().min(1, "*Masukkan Negara"),
  province: z.string().min(1, "*Masukkan provinsi"),
  address: z.string().min(1, "*Masukkan alamat"),
  city: z.string().min(1, "*Masukkan kota"),
  zipCode: z.string().min(1, "*Masukkan kode ZIP/Pos"),
});

const AddAddress = () => {
  const [country, setCountry] = useState("Indonesia");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const { updateSuccess, loading} = useSelector(
    (states) => states.updateUserDetail,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { country, province, address, city, zipCode };

    try {
      // Validate form data
      addressSchema.parse(formData);
      setErrors({});
      dispatch(asyncUpdateUser(formData));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  useEffect(() => {
    if (updateSuccess) {
      setCountry("Indonesia");
      setProvince("");
      setZipCode("");
      setCity("");
      setAddress("");
      dispatch(clearStatusUpdatedActionCreator());
    }
  }, [updateSuccess, dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-x-4 gap-y-4 text-xs text-gray-800 sm:text-sm md:grid-cols-2 lg:gap-y-8 xl:text-base"
    >
      <h2 className="text-sm font-bold md:col-span-2 md:text-base lg:text-xl">
        Tambahkan Alamat
      </h2>
      <SelectForm
        label="Negara/Wilayah"
        name="country"
        container="col-span-2"
        variant={true}
        classNameContainer="col-span-2"
        placeholder="Negara/Wilayah"
        value={country}
        error={errors.country}
        onChange={(e) => setCountry(e.target.value)}
        options={[
          {
            value: "Indonesia",
            label: "Indonesia",
          },
        ]}
      />
      {errors.country && (
        <p className="text-xs text-red-500">{errors.country}</p>
      )}
      <InputForm
        label="Alamat"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        variant={true}
        disabled={loading}
        className=" placeholder-black"
        container="col-span-2"
        placeholder="Alamat"
        error={errors.address}
      />
      <InputForm
        label="Kota"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        variant={true}
        disabled={loading}
        className=" placeholder-black"
        container="col-span-2"
        placeholder="Kota"
        error={errors.city}
      />

      <SelectForm
        variant={true}
        label="Provinsi"
        name="provinsi"
        disabled={loading}
        classNameContainer="col-span-2"
        placeholder="Provinsi"
        value={province}
        onChange={(e) => setProvince(e.target.value)}
        options={data_provinsi.map((item, index) => ({
          key: index,
          value: item.value,
          label: item.label,
        }))}
        error={errors.province}
      />
      <InputForm
        disabled={loading}
        label="Kode Pos"
        value={zipCode}
        type="number"
        onChange={(e) => setZipCode(e.target.value)}
        variant={true}
        className=" placeholder-black"
        container=""
        placeholder="Kode Pos"
        error={errors.zipCode}
      />

      <Button
        disabled={loading}
        type="submit"
        className="col-span-2 mt-2 rounded p-2 text-xs sm:text-sm md:text-base"
      >
        SIMPAN
      </Button>
    </form>
  );
};

export default AddAddress;
