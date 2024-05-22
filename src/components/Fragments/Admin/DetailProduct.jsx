import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  asyncDeleteProductById,
  asyncSetDetailProduct,
  clearDetailProductActionCreator,
} from "../../../redux/detailProduct/action";
import { MdArrowBack } from "react-icons/md";
import DetailContent from "./DetailContent";
import ModalEdit from "./ModalEdit";
import FormEditProduct from "./FormEditProduct";

const DetailProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { detailProduct, updateSuccess, loading, deleteSuccess } = useSelector(
    (state) => state.detailProduct,
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(asyncSetDetailProduct(productId));

    if (pathname !== `/admin/tabel/products/${productId}`) {
      dispatch(clearDetailProductActionCreator());
    }
    if (deleteSuccess) {
      navigate("../tabel-products");
    }
  }, [dispatch, navigate, productId, pathname, deleteSuccess]);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    dispatch(asyncDeleteProductById(productId));
  };

  if (!detailProduct) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto">
      <button
        onClick={() => navigate("../tabel-products")}
        className="mb-4 flex items-center gap-2 rounded-lg bg-primaryColor px-4 py-1 text-xl font-medium text-slate-200 transition duration-200 ease-in-out hover:bg-secondaryColor hover:text-white"
      >
        <MdArrowBack className="h-6 w-6" />
        Back
      </button>
      <h1 className="mb-4 flex items-center gap-2 px-2 text-2xl font-semibold text-primaryColor">
        Detail Product /
        <span className="text-gray-800">
          {detailProduct.name} - {detailProduct.category}
        </span>
      </h1>

      <DetailContent>
        <DetailContent.Header
          name={detailProduct.name}
          price={detailProduct.price}
          brand={detailProduct.brand}
          discount={detailProduct.discount}
          best={detailProduct.best}
          imageUrl={detailProduct.imageUrl}
        />
        <DetailContent.Body
          description={detailProduct.description}
          table={true}
          stock={detailProduct.stock}
          rating={detailProduct.rating}
          isActive={detailProduct.isActive}
        />
        <DetailContent.Footer
          createdAt={detailProduct.createdAt}
          updatedAt={detailProduct.updatedAt}
          author={detailProduct.author}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
        />
      </DetailContent>

      {isEditModalOpen && (
        <ModalEdit title={"Edit Product"}>
          <FormEditProduct
            data={detailProduct}
            setIsEditModalOpen={setIsEditModalOpen}
            status={updateSuccess}
            loading={loading}
          />
        </ModalEdit>
      )}
    </div>
  );
};

export default DetailProduct;
