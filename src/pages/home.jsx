import CardCategories from "../components/Fragments/CardCategories";
import CardProduct from "../components/Fragments/CardProduct";
import NavbarLayout from "../components/Layouts/NavbarLayout";

const HomePage = () => {
  return (
    <div>
      <NavbarLayout />
      <div className="">
        {/* <div className="m-auto my-10 h-60 max-w-[85%] animate-pulse bg-primaryColor">
          Banner
        </div> */}

        <div className="m-auto mb-10 hidden max-w-[85%] rounded-lg bg-white px-9 py-4 shadow-lg lg:block">
          <h2 className="mb-5 font-semibold">Categories</h2>
          <div className="mx-auto flex max-w-min items-center gap-6">
            <CardCategories imageUrl="asdasdasd">MCB</CardCategories>
            <CardCategories imageUrl="asdasdasd">Conector</CardCategories>
            <CardCategories imageUrl="asdasdasd">Kabel</CardCategories>
            <CardCategories imageUrl="asdasdasd">Barang</CardCategories>
          </div>
        </div>
      </div>

      <div className="m-auto mb-10 max-w-[85%] rounded-lg bg-white p-2 shadow-lg lg:px-9 lg:py-4">
        <h2 className="text-md mb-5 font-semibold md:text-2xl">Best Seller</h2>
        <div className="flex items-center justify-center gap-2 overflow-auto lg:gap-6">
          <CardProduct>
            <CardProduct.Header image="" title="Kabel" />
            <CardProduct.Footer price={20000} />
          </CardProduct>
          <CardProduct>
            <CardProduct.Header image="" title="Kabel" />
            <CardProduct.Footer price={20000} />
          </CardProduct>
          <CardProduct>
            <CardProduct.Header image="" title="Kabel" />
            <CardProduct.Footer price={20000} />
          </CardProduct>
          <CardProduct>
            <CardProduct.Header image="" title="Kabel" />
            <CardProduct.Footer price={20000} />
          </CardProduct>
        </div>
      </div>
      <div className="m-auto mb-10 max-w-[85%] rounded-lg bg-white p-2 shadow-lg lg:px-9 lg:py-4">
        <h2 className="text-md mb-5 font-semibold md:text-2xl">Best Seller</h2>
        <div className="flex max-w-max flex-wrap items-center justify-center gap-2 lg:gap-6">
          <CardProduct>
            <CardProduct.Header image="" title="Kabel" />
            <CardProduct.Body>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim iure
              aliquam repellat molestias accusamus, quae rem quibusdam
              recusandae at? Provident quaerat unde doloremque sapiente velit!
              Cumque aperiam vero dolore nesciunt.
            </CardProduct.Body>
            <CardProduct.Footer price={20000} />
          </CardProduct>
          <CardProduct>
            <CardProduct.Header image="" title="Kabel" />
            <CardProduct.Body>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim iure
              aliquam repellat molestias accusamus, quae rem quibusdam
              recusandae at? Provident quaerat unde doloremque sapiente velit!
              Cumque aperiam vero dolore nesciunt.
            </CardProduct.Body>
            <CardProduct.Footer price={20000} />
          </CardProduct>
          <CardProduct>
            <CardProduct.Header image="" title="Kabel" />
            <CardProduct.Body>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim iure
              aliquam repellat molestias accusamus, quae rem quibusdam
              recusandae at? Provident quaerat unde doloremque sapiente velit!
              Cumque aperiam vero dolore nesciunt.
            </CardProduct.Body>
            <CardProduct.Footer price={20000} />
          </CardProduct>
          <CardProduct>
            <CardProduct.Header image="" title="Kabel" />
            <CardProduct.Body>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim iure
              aliquam repellat molestias accusamus, quae rem quibusdam
              recusandae at? Provident quaerat unde doloremque sapiente velit!
              Cumque aperiam vero dolore nesciunt.
            </CardProduct.Body>
            <CardProduct.Footer price={20000} />
          </CardProduct>
          <CardProduct>
            <CardProduct.Header image="" title="Kabel" />
            <CardProduct.Body>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim iure
              aliquam repellat molestias accusamus, quae rem quibusdam
              recusandae at? Provident quaerat unde doloremque sapiente velit!
              Cumque aperiam vero dolore nesciunt.
            </CardProduct.Body>
            <CardProduct.Footer price={20000} />
          </CardProduct>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
