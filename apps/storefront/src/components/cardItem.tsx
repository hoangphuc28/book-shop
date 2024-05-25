import Image from "next/image";
import Link from "next/link";
export default function CardItem() {
const src = 'https://cdn.shopify.com/s/files/1/0533/2089/files/design-books-the-design-of-everyday-things-book-cover.jpg?v=1587988106'
  return (
  <div className="col-lg-4 col-sm-6">
  <div className="product-item">
    <div className="pi-pic p-5">
      <div className="flex justify-center">
      <img width={150} height={100} src={src} alt="image"  className="object-cover"/>
      </div>
    </div>
    <div className="pi-text">
      <div className="catagory-name">Coat</div>
      <a href="/products/1">
        <h5 style={{color: '#5B5B5B'}}>Guangzhou sweater</h5>
      </a>
      <div className="product-price">
        $13.00
        <span>$35.00</span>
      </div>
      <div className="mt-2 mb-5">
        <div className="flex justify-center">
        <Link className="btn-style1 py-2 px-2 w-9/12 " href={'/cart'}>Add To Cart</Link>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
