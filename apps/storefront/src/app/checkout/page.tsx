import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaypalLogo from '../../../images/logopaypal.png'
import Image from 'next/image';
export default function Checkout() {
    return (
        <div>
            <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6 mt-10">
                <div className="col-span-7 border border-gray-200 p-4 rounded mr-5">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first-name" className="text-gray-600">First Name <span className="text-primary">*</span></label>
                                <input type="text" name="first-name" id="first-name" className="input-box" />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="text-gray-600">Last Name <span className="text-primary">*</span></label>
                                <input type="text" name="last-name" id="last-name" className="input-box" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address" className="text-gray-600">Address</label>
                            <input type="text" name="address" id="address" className="input-box" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="text-gray-600">Phone number</label>
                            <input type="text" name="phone" id="phone" className="input-box" />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-gray-600">Email address</label>
                            <input type="email" name="email" id="email" className="input-box" />
                        </div>
                        <a href="#" style={{ color: '#c78443' }} className='underline block mt-1'>Use default information</a>

                        <div>
                            <div className="payment pl-5" style={{ display: 'flex', justifyContent: 'start' }}>
                                <label style={{ display: 'flex', margin: 0, alignItems: 'center' }}>
                                    <input id="cod" required style={{ height: 20, width: 20 }} type="radio" defaultValue={1} name="paymentMethod.id"/>
                                    <div className='mr-10 ml-5'>
                                        <LocalShippingOutlinedIcon sx={{ fontSize: 40 }} />
                                    </div>
                                    <p>Cod<br />
                                        Thanh toán khi nhận hàng
                                    </p>
                                </label>
                            </div>
                            <div className="payment pl-5" style={{ display: 'flex', justifyContent: 'start' }}>
                                <label style={{ display: 'flex', margin: 0, alignItems: 'center' }}>
                                    <input id="cod" required style={{ height: 20, width: 20 }} type="radio" defaultValue={1} name="paymentMethod.id" />
                                    <div className='mr-5 ml-5'>
                                        <Image src={PaypalLogo} alt="#" width={60} height={60} />
                                    </div>
                                    <p>Paypal<br />
                                        Thanh toán trực tuyến
                                    </p>
                                </label>
                            </div>
                            <a href="#" className="btn-style1 block w-full text-center py-4" style={{ fontSize: '16px' }}>Submit</a>
                        </div>
                    </div>


                </div>
                <div className="col-span-5 border border-gray-200 p-4 rounded mr-5">
                    <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">order summary</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <div>
                                <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
                                <p className="text-sm text-gray-600">Size: M</p>
                            </div>
                            <p className="text-gray-600">
                                x3
                            </p>
                            <p className="text-gray-800 font-medium">$320</p>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
                                <p className="text-sm text-gray-600">Size: M</p>
                            </div>
                            <p className="text-gray-600">
                                x3
                            </p>
                            <p className="text-gray-800 font-medium">$320</p>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
                                <p className="text-sm text-gray-600">Size: M</p>
                            </div>
                            <p className="text-gray-600">
                                x3
                            </p>
                            <p className="text-gray-800 font-medium">$320</p>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
                                <p className="text-sm text-gray-600">Size: M</p>
                            </div>
                            <p className="text-gray-600">
                                x3
                            </p>
                            <p className="text-gray-800 font-medium">$320</p>
                        </div>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                        <p>Coupon</p>
                        <p>-$280</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                        <p>subtotal</p>
                        <p>$1280</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                        <p>shipping</p>
                        <p>Free</p>
                    </div>
                    <div className="flex justify-between text-gray-800 font-medium pt-3 uppercas">
                        <p className="font-semibold">Total</p>
                        <p>$1280</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
