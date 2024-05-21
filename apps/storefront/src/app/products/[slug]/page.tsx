import Review from "@/app/components/review";
import DescriptionProductDetail from "./descriptionProductDetail";

export default function Index({ params }: { params: { slug: string } }) {
  const src =
    "https://cdn.shopify.com/s/files/1/0533/2089/files/design-books-the-design-of-everyday-things-book-cover.jpg?v=1587988106";

  return (
    <div className="mt-10">
      <div className="container grid grid-cols-2 gap-6">
        <div>
          <div className="flex justify-center items-center">
            <img width={300} height={300} src={src} alt="product" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-medium uppercase mb-2">
            Italian L Shape Sofa
          </h2>
          <div className="flex items-center mb-4">
            <div className="flex gap-1 text-sm text-yellow-400">
              <span>
                <i className="fa-solid fa-star" />
              </span>
              <span>
                <i className="fa-solid fa-star" />
              </span>
              <span>
                <i className="fa-solid fa-star" />
              </span>
              <span>
                <i className="fa-solid fa-star" />
              </span>
              <span>
                <i className="fa-solid fa-star" />
              </span>
            </div>
            <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-800 font-semibold space-x-2">
              <span>Availability: </span>
              <span className="text-green-600">In Stock</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Brand: </span>
              <span className="text-gray-600">Apex</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Category: </span>
              <span className="text-gray-600">Sofa</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">SKU: </span>
              <span className="text-gray-600">BE45VGRT</span>
            </p>
          </div>
          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
            <p className="text-xl text-primary font-semibold">$45.00</p>
            <p className="text-base text-gray-400 line-through">$55.00</p>
          </div>
          <p className="mt-4 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eius
            eum reprehenderit dolore vel mollitia optio consequatur hic
            asperiores inventore suscipit, velit consequuntur, voluptate
            doloremque iure necessitatibus adipisci magnam porro.
          </p>
          <div className="mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
              <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                -
              </div>
              <div className="h-8 w-8 text-base flex items-center justify-center">
                4
              </div>
              <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                +
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-3 pb-5 pt-5">
            <a className="btn-style1 px-2 py-3 cursor-pointer">
              Add To Cart
            </a>
          </div>
        </div>
      </div>
      <DescriptionProductDetail/>
      <Review/>
    </div>
  );
}
