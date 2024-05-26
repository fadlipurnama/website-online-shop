import { useDispatch, useSelector } from "react-redux";
import DetailProductLayout from "../components/Layouts/DetailProductLayout";
import { useEffect } from "react";
import { asyncSetDetailProduct } from "../redux/detailProduct/action";
import { useParams } from "react-router-dom";
import LazyImage from "../components/Elements/LazyImage";

const DetailProductPage = () => {
  const { productId } = useParams();
  const {detailProduct, loading} = useSelector((states) => states.detailProduct)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncSetDetailProduct(productId));
  }, [dispatch, productId]);

  return (
    <DetailProductLayout>
      <div className="w-full flex">
        <LazyImage src={detailProduct?.imageUrl}  className={`w-[472px] object-cover h-[472px]`}/>
        
      </div>
    </DetailProductLayout>
  );
};

export default DetailProductPage;
