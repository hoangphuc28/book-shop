export default function ListOrders() {
    const src = "https://cdn.shopify.com/s/files/1/0533/2089/files/design-books-the-design-of-everyday-things-book-cover.jpg?v=1587988106";

    return (
        <div className="col-span-9 space-y-4">
            <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
                <div className="w-28">
                    <img
                        src={src}
                        width={100}
                        height={100}
                        style={{ width: 100, height: 100, objectFit: "contain" }}
                        alt="product 6"
                    />
                </div>
                <div className="w-1/3">
                    <h2 className="text-gray-800 text-xl font-medium uppercase">Italian L shape</h2>
                    <p className="text-gray-500 text-sm">1/1/2024</p>
                    <p className="text-gray-500 text-sm">2 sản phẩm</p>
                </div>
                <div className="text-primary text-lg font-semibold">$320.00</div>
                <div>
                    <div className="flex">
                        <a href="/profile/orders/1" className="underline block mr-5">
                            View Detail</a>
                    </div>

                </div>


            </div>

        </div>

    )
}