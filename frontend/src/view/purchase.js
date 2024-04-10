import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../generalStyle/style.css"
import { PurchaseProduct } from '../apiServices';
import { useDispatch, useSelector } from 'react-redux';

export default function Purchase() {

        const location = useLocation();
        const navigate = useNavigate();
        const { newItem } = location.state;
        const [userName, setUserName] = useState('');
        const [paymentMethod, setPaymentMethod] = useState('');
        const [phoneNumber, setPhoneNumber] = useState('');
        const [isLoading, setIsLoading] = useState(false);
        const [successMessage, setSuccessMessage] = useState('');
        const [address, setAddress] = useState({
            street: '',
            city: '',
            province: '',
            country: ''
        });
        const { token } = useSelector(state => state.user);
        const AccountBuy = useSelector(state => state.user.email);
        console.log(AccountBuy);

        const handleUserNameChange = (e) => {
            setUserName(e.target.value);
        };

        const handlePhoneNumberChange = (e) => {
            setPhoneNumber(e.target.value);
        };

        const handlePaymentMethod = (e) => {
            setPaymentMethod(e.target.value);
        };

        const handleAddressChange = (e) => {
            setAddress({ ...address, [e.target.name]: e.target.value });
        };

        const fetchData = async (order) => {
            try {
                const response = await PurchaseProduct.post(order, token);
                setSuccessMessage('Successful purchase!');
                navigate(`/product`);
            } catch (error) {
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            const order = {
                name: newItem.name,
                size: newItem.size,
                price: newItem.price,
                quantity: newItem.quantity,
                total: newItem.total,
                userName: userName,
                address: `${address.street} - ${address.city} - ${address.province} - ${address.country}`,
                phoneNumber: phoneNumber,
                paymentMethod: paymentMethod,
                AccountBuy: AccountBuy,
            };
            try {
                await fetchData(order);
            } catch (error) {
            }
        };

    return (
        <>
            <div className="header_1">
                <div className="header" style={{ padding: '25px 0', width: '80% !important', flexDirection: 'row' }}>
                    <div className="logo-container" onClick={() => window.location.href = "http://localhost:3000/product"} style={{ width: '50%' }}>
                        <div style={{ borderRight: '1px solid #ccc', paddingRight: '2%' }}>
                            <img className="logo" src="https://img.freepik.com/premium-vector/tshirt-logo-clothing-logo-apparel-store-icon-fashion-logo-design-tshirt-icon-template_657888-112.jpg" alt="Shirt Store Logo" />
                            <span className="store-name">Shirt Store</span>
                        </div>
                        <div style={{ paddingLeft: '10%', fontSize: '30px' }}>
                            <div>PURCHASE</div>
                        </div>
                    </div>

                </div>
            </div>

            <div>
                {successMessage && (
                    <div className="success-message">{successMessage}</div>
                )}
                {!successMessage && (<div className="purchase-container">
                    <h2>Delivery address</h2>
                    <form onSubmit={handleSubmit} className="receiver-info">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Recipient's name:</label>
                                <input type="text" id="name" name="name" value={userName.name} onChange={handleUserNameChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone number:</label>
                                <input type="text" id="phoneNumber" name="phoneNumber" value={phoneNumber.phoneNumber} onChange={handlePhoneNumberChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="street">Specific address:</label>
                                <input type="text" id="street" name="street" value={address.street} onChange={handleAddressChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">District/District/Ward:</label>
                                <input type="text" id="city" name="city" value={address.city} onChange={handleAddressChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="province">Province/City:</label>
                                <input type="text" id="province" name="province" value={address.province} onChange={handleAddressChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Nation:</label>
                                <input type="text" id="country" name="country" value={address.country} onChange={handleAddressChange} required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="paymentMethod">Payment methods:</label>
                                <select className="select-box" id="paymentMethod" name="paymentMethod" value={paymentMethod.paymentMethod} onChange={handlePaymentMethod} required>
                                    <option value="">-- Select a payment method --</option>
                                    <option value="cashOnDelivery">Payment on delivery</option>
                                    {/* <option value="creditCard">Chuyển qua thẻ</option> */}
                                </select>
                            </div>
                        </div>

                    </form>
                    <div className="order-info">
                        <h2>Information line</h2>
                        <div className="order-summary">
                            <div class="product-info2">
                                <div class="product-name">Product's name</div>
                                <div class="product-total">Price</div>
                                <div class="product-quantity">Quantity</div>
                                <div class="product-total">Color</div>
                                <div class="product-total">Size</div>
                                <div class="product-price">Total</div>
                            </div>

                            <div class="product-info">
                                <div class="product-name">{newItem?.name}</div>
                                <div class="product-total">{newItem?.price}</div>
                                <div class="product-quantity">{newItem?.quantity}</div>
                                <div class="product-total">{newItem?.color}</div>
                                <div class="product-total">{newItem?.size}</div>
                                <div class="product-price">{newItem?.total}</div>
                            </div>


                        </div>
                    </div>
                    <button type="submit" style={{ marginTop: "5%" }} onClick={handleSubmit}>Purchase confirmation</button>
                </div>
                )}

            </div>
        </>
    )
}