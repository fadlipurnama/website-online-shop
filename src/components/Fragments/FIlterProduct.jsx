import InputSearch from "../Elements/InputSearch";
import SelectForm from "../Elements/Select";

const FilterProduct = ({
  brands,
  searchTerm,
  setSearchTerm,
  setPriceFilter,
  setBrandFilter,
  loading,
  priceFilter,
  brandFilter,
}) => {
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handlePriceFilterChange = (e) => setPriceFilter(e.target.value);
  const handleBrandFilterChange = (e) => setBrandFilter(e.target.value);

  return (
    <div className="mb-4 flex-wrap flex w-full items-center justify-between gap-2">
      <InputSearch
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Cari product berdasarkan nama ..."
        defaultElement={true}
      />
      <div className="flex w-full gap-2 md:w-1/2">
        <SelectForm
          disabled={loading}
          options={brands?.map((brand) => ({
            // key: index,
            label: brand.toUpperCase(),
            value: brand,
          }))}
          value={brandFilter}
          placeholder="Brand Product"
          className="text-md rounded py-3"
          onChange={handleBrandFilterChange}
        />
        <SelectForm
          disabled={loading}
          options={[
            { value: "low", label: "Harga Terendah" },
            { value: "high", label: "Harga Tertinggi" },
          ]}
          value={priceFilter}
          placeholder="Harga Product"
          className="text-md rounded py-3"
          onChange={handlePriceFilterChange}
        />
      </div>
    </div>
  );
};

export default FilterProduct;
