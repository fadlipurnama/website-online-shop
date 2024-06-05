import InputSearch from "../Elements/InputSearch";
import SelectCustom from "../Elements/SelectCustom";

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
    <div className="flex w-full flex-col items-stretch justify-between gap-2 py-4 lg:mb-4 lg:flex-row lg:items-center lg:gap-10">
      <InputSearch
        container="lg:max-w-sm"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Cari product berdasarkan nama ..."
        defaultElement={true}
        className="py-4 text-sm md:text-base"
      />
      <div className="flex w-full flex-col gap-2 lg:max-w-lg lg:flex-row">
        <SelectCustom
          label="Sortir merek"
          disabled={loading}
          options={brands?.map((brand) => ({
            // key: index,
            label: brand.toUpperCase(),
            value: brand,
          }))}
          value={brandFilter}
          placeholder="Sortir merek"
          className="text-md rounded py-3"
          onChange={handleBrandFilterChange}
        />
        <SelectCustom
          label="Sortir harga"
          disabled={loading}
          options={[
            { value: "low", label: "Harga Terendah" },
            { value: "high", label: "Harga Tertinggi" },
          ]}
          value={priceFilter}
          placeholder="Sortir harga"
          className="text-md rounded py-3"
          onChange={handlePriceFilterChange}
        />
      </div>
    </div>
  );
};

export default FilterProduct;
