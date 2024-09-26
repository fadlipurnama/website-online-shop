import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  asyncSetDetailProduct,
  clearDetailProductActionCreator,
} from "../redux/detailProduct/action";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import DetailProduct from "../components/Fragments/DetailProduct";

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
      <DefaultLayout description={detailProduct?.description} title={detailProduct?.name} lastLabel={detailProduct?.name}>
        <DetailProduct
          data={detailProduct}
          loading={loading}
          productId={productId}
        />
      </DefaultLayout>
    </>
  );
};

export default DetailProductPage;
