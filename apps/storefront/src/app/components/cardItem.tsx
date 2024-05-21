import Image from "next/image";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Link from "next/link";
export default function CardItem() {
const src = 'https://cdn.shopify.com/s/files/1/0533/2089/files/design-books-the-design-of-everyday-things-book-cover.jpg?v=1587988106'
  return (
  <div className="col-lg-4 col-sm-6">
  <div className="product-item">
    <div className="pi-pic p-5">
      <img src={src} alt="image" width={150} height={225} className="object-cover"/>
      <div className="icon">
        <i className="icon_heart_alt" />
      </div>
      {/* <ul>
        <li className="quick-view"><a href="#">+ Add To Cart</a></li>
      </ul> */}
    </div>
    <div className="pi-text mt-3">
      <div className="catagory-name">Coat</div>
      <a href="#">
        <h5 style={{color: '#5B5B5B'}}>Guangzhou sweater</h5>
      </a>
      <div className="product-price">
        $13.00
        <span>$35.00</span>
      </div>
      <div className="mt-5 mb-5">
        <div className="flex justify-center">
        <Link className="btn-style1 py-3 w-9/12 px-2" href={'/cart'}>Add To Cart</Link>

        </div>
      </div>
    </div>
  </div>
</div>

  );
}
