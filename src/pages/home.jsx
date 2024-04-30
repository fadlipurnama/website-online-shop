import CardCategories from "../components/Fragments/CardCategories";
import CardProduct from "../components/Fragments/CardProduct";
import Navbar from "../components/Layouts/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="">
        <div className="animate-pulse h-60 m-auto max-w-[85%] bg-primaryColor my-10">
          Banner
        </div>

        <div className="hidden mb-10 max-w-[85%] m-auto rounded-lg shadow-lg py-4 px-9 bg-white lg:block">
          <h2 className="font-semibold mb-5">Categories</h2>
          <div className="flex items-center max-w-min mx-auto gap-6">
            <CardCategories imageUrl="asdasdasd">MCB</CardCategories>
            <CardCategories imageUrl="asdasdasd">Conector</CardCategories>
            <CardCategories imageUrl="asdasdasd">Kabel</CardCategories>
            <CardCategories imageUrl="asdasdasd">Barang</CardCategories>
          </div>
        </div>
      </div>

      <div className="max-w-[85%] m-auto mb-10 rounded-lg shadow-lg p-2 lg:px-9 lg:py-4 bg-white">
        <h2 className="text-md md:text-2xl font-semibold mb-5">Best Seller</h2>
        <div className="overflow-auto gap-2 flex justify-center items-center lg:gap-6">
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
      <div className="max-w-[85%] m-auto mb-10 rounded-lg shadow-lg p-2 lg:px-9 lg:py-4 bg-white">
        <h2 className="text-md md:text-2xl font-semibold mb-5">Best Seller</h2>
        <div className="gap-2 max-w-max flex justify-center flex-wrap items-center lg:gap-6">
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
