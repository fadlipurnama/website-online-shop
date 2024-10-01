import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  asyncSetDetailProduct,
  clearDetailProductActionCreator,
} from "../redux/detailProduct/action";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import DetailProduct from "../components/Fragments/DetailProduct";
import DataNotFound from "../components/Fragments/DataNotFound";
import LoadingPage from "./loading";

const DetailProductPage = () => {
  const { productId } = useParams();
  const { detailProduct, loading } = useSelector(
    (states) => states.detailProduct,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncSetDetailProduct(productId));
    return () => {
      dispatch(clearDetailProductActionCreator());
    };
  }, [dispatch, productId]);

  return (
    <>
      <DefaultLayout
        description={detailProduct?.description}
        title={detailProduct?.name}
        lastLabel={detailProduct?.name}
      >
        {loading ? (
          <LoadingPage />
        ) : detailProduct ? (
          <DetailProduct
            data={detailProduct}
            loading={loading}
            productId={productId}
          />
        ) : (
          <DataNotFound
            title={"Data tidak ditemukan"}
            description={"Informasi produk yang kamu cari tidak ada."}
          />
        )}
      </DefaultLayout>
    </>
  );
};

export default DetailProductPage;
