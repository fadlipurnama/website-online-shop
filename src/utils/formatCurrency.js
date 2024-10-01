export const formatCurrency = (amount) => {
    return amount
      ?.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      })
      .replace(/,00$/, "");
  };