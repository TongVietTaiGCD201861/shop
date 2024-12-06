import React, { useState, useEffect } from 'react';
import "../generalStyle/style.css";
import { dataProvince } from './dataProvince';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faDollar, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Discount } from '../apiServices/discountApiEndPoint';
import { useSelector } from 'react-redux';

export default function Purchase() {
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('COD');
    const location = useLocation();
    const selectedItems = location.state?.selectedItems || [];
    const [discountCode, setDiscountCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [dataDiscount, setDataDiscount] = useState([]);
    const { token } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [provinceName, setProvinceName] = useState([]);
    const [districtName, setDistrictName] = useState([]);
    const [wardName, setWardName] = useState([]);

    useEffect(() => {
        setProvinces(dataProvince);
    }, []);

    const handleProvinceChange = (e) => {
        const provinceId = e.target.value;
        setSelectedProvince(provinceId);
        const selectedProvince = dataProvince.find(p => p.Id === provinceId);
        setDistricts(selectedProvince ? selectedProvince.Districts : []);
        setSelectedDistrict('');
        setWards([]);
        setSelectedWard('');
        setProvinceName(selectedProvince.Name);
    };

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);
        const selectedDistrict = districts.find(d => d.Id === districtId);
        setWards(selectedDistrict ? selectedDistrict.Wards : []);
        setSelectedWard('');
        setDistrictName(selectedDistrict.Name);
    };

    const handleWardChange = (e) => {
        setSelectedWard(e.target.value);
        const selectedWard = wards.find(w => w.Id === e.target.value);
        setWardName(selectedWard.Name);
    };

    const handlePaymentChange = (e) => {
        setSelectedPayment(e.target.value);
    };

    const handleApply = () => {
        getDiscountByCode(discountCode);
    };

    const getDiscountByCode = async (discountCode) => {
        setIsLoading(true);
        try {
            const response = await Discount.getByCode(token, discountCode);
            setDataDiscount(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const handleBackToCart = () => {
        navigate('/product/cart');
    };

    const handleOrder = async () => {
        if (!email || !fullName || !phoneNumber || !selectedProvince || !selectedDistrict || !selectedWard || !address) {
            alert('Please fill in all required fields!');
            return;
        }
    
        const orderData = {
            customer: {
                email,
                fullName,
                phoneNumber,
            },
            shippingAddress: {
                province: provinceName,
                district: districtName,
                ward: wardName,
                address,
            },
            items: selectedItems.map(item => ({
                id: item.shirt.id,
                name: item.shirt.name,
                quantity: item.quantity,
                total: item.total,
            })),
            paymentMethod: selectedPayment,
            notes: description,
            discountCode,
            shippingFee: 2.00, 
            totalPrice: (
                (selectedItems.reduce((total, item) => total + item.total, 0) + 2) *
                (1 - (dataDiscount?.valueReduced || 0) / 100)
            ).toFixed(2),
        };
        console.log(orderData);
    }

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div style={{ width: '80%', marginLeft: '20%', display: 'flex' }}>
            <div style={{ width: '50%' }}>
                <div className="logo-container" style={{ marginTop: '2%' }}>
                    <img src="//bizweb.dktcdn.net/100/113/556/themes/161811/assets/logo.png?1676963410531" alt='maxxshop' />
                </div>
                <div style={{ width: '100%', padding: '1%', display: 'flex' }}>
                    <div style={{ width: '48%', marginRight: "4%" }}>
                        <p style={{ fontSize: '20px', fontWeight: '500' }}>Delivery information</p>
                        <div>
                            <input name="email" placeholder='Email' className='input-purchase' onChange={(e) => setEmail(e.target.value)} />
                            <input name="fullName" placeholder='Full name' className='input-purchase' onChange={(e) => setFullName(e.target.value)} />
                            <input name="phoneNumber" placeholder='Phone number' className='input-purchase' onChange={(e) => setPhoneNumber(e.target.value)} />
                            <select value={selectedProvince} onChange={handleProvinceChange} className='input-purchase'>
                                <option value="">Select Province/City</option>
                                {provinces?.map(province => (
                                    <option key={province?.Id} value={province?.Id}>{province?.Name}</option>
                                ))}
                            </select>

                            <select value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedProvince} className='input-purchase'>
                                <option value="">Select District</option>
                                {districts?.map(district => (
                                    <option key={district?.Id} value={district?.Id}>{district?.Name}</option>
                                ))}
                            </select>

                            <select value={selectedWard} onChange={handleWardChange} disabled={!selectedDistrict} className='input-purchase'>
                                <option value="">Select Ward/Commune</option>
                                {wards?.map(ward => (
                                    <option key={ward?.Id} value={ward?.Id}>{ward?.Name}</option>
                                ))}
                            </select>
                            <input name="address" placeholder='Address' className='input-purchase' onChange={(e) => setAddress(e.target.value)} />
                            <textarea name="description" placeholder='Notes (optional)' className='input-purchase' onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div style={{ width: '48%' }}>
                        <p style={{ fontSize: '20px', fontWeight: '500' }}>Transport</p>
                        <div style={{
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            padding: '3%',
                            display: 'flex',
                            gap: '10%',
                            width: '100%',
                            alignItems: 'center',
                        }}>
                            <div style={{
                                display: 'flex',
                                gap: '1%',
                                width: '70%',
                                alignItems: 'center',
                            }}>
                                <input
                                    type="radio"
                                    value="option1"
                                    checked={true}
                                />
                                <div style={{ marginLeft: '2%' }}>
                                    Delivery to your door
                                </div>
                            </div>
                            <div>
                                $2.00
                            </div>
                        </div>

                        <p style={{ fontSize: '20px', fontWeight: '500', marginTop: '5%' }}>Pay</p>
                        {/* Cash on Delivery */}
                        <div style={{
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            padding: '3%',
                            display: 'flex',
                            gap: '10%',
                            width: '100%',
                            alignItems: 'center',
                        }}>
                            <div style={{
                                display: 'flex',
                                gap: '1%',
                                width: '85%',
                                alignItems: 'center',
                            }}>
                                <input
                                    type="radio"
                                    value="COD"
                                    name="paymentMethod"
                                    checked={selectedPayment === 'COD'}
                                    onChange={handlePaymentChange}
                                />
                                <div style={{ marginLeft: '2%' }}>
                                    Cash on Delivery (COD)
                                </div>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faMoneyBill} color='blue' />
                            </div>
                        </div>

                        {/* PayPal */}
                        <div style={{
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            padding: '3%',
                            display: 'flex',
                            gap: '10%',
                            width: '100%',
                            alignItems: 'center',
                            marginTop: '5%',
                        }}>
                            <div style={{
                                display: 'flex',
                                gap: '1%',
                                width: '85%',
                                alignItems: 'center',
                            }}>
                                <input
                                    type="radio"
                                    value="PayPal"
                                    name="paymentMethod"
                                    checked={selectedPayment === 'PayPal'}
                                    onChange={handlePaymentChange}
                                />
                                <div style={{ marginLeft: '2%' }}>
                                    Payment via PayPal
                                </div>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faPaypal} color='blue' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: '50%', background: '#fafafa' }}>
                <div style={{ width: '60%', borderLeft: '1px solid #ccc', minHeight: '96vh' }}>
                    <div style={{
                        borderBottom: '1px solid #ccc',
                        padding: "2%",
                        fontSize: '1.5rem',
                        fontWeight: '500',
                    }}>Order (2 products)
                    </div>
                    <div style={{ padding: '5% 0 0 5%' }}>
                        <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '2%' }}>
                            {selectedItems.map(item => (
                                <li key={item.id}>
                                    {item?.shirt?.name} - Quantity: {item.quantity} - Total: {item.total}
                                </li>
                            ))}
                        </div>
                    </div>

                    <div style={{ padding: '5% 0 0 5%' }}>
                        <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '2%', width: '100%', display: 'flex' }}>
                            <div style={{ width: '70%' }}>
                                <input
                                    name="discount"
                                    placeholder='Discount code'
                                    className='input-discount'
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                />
                            </div>
                            <div style={{
                                width: '30%',
                                display: 'flex',
                                justifyContent: 'end',
                                height: '45px'
                            }}>
                                <button onClick={handleApply}
                                    style={{ marginLeft: '5%' }}
                                    className="btn-order">Apply</button>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '5% 0 0 5%' }}>
                        <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '2%' }}>
                            <div style={{ width: '100%', display: 'flex' }}>
                                <div style={{ width: '80%' }}>Provisional</div>
                                <div style={{ width: '20%' }}> ${selectedItems.reduce((total, item) => total + item.total, 0).toFixed(2)}</div>
                            </div>

                            <div style={{ width: '100%', display: 'flex', marginTop: '2%', marginBottom: '2%' }}>
                                <div style={{ width: '80%' }}>Shipping fee</div>
                                <div style={{ width: '20%' }}> $2.00</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '5% 0 0 5%' }}>
                        <div>
                            <div style={{ width: '100%', display: 'flex' }}>
                                <div style={{ width: '80%', fontSize: '22px' }}>Total</div>
                                <div style={{ width: '20%', fontSize: '22px' }}>
                                    ${
                                        (
                                            (selectedItems.reduce((total, item) => total + item.total, 0) + 2) *
                                            (1 - (dataDiscount?.valueReduced || 0) / 100)
                                        ).toFixed(2)
                                    }
                                </div>
                            </div>
                            <div style={{ display: 'flex', marginTop: '6%', width: '100%', alignItems: 'center' }}>
                                <div style={{ width: '50%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }} className='back-to-cart'
                                        onClick={handleBackToCart}>
                                        <FontAwesomeIcon icon={faChevronLeft} color='green' />
                                        <div>Back to cart</div>
                                    </div>

                                </div>
                                <div style={{ width: '50%', display: 'flex', justifyContent: 'end' }}>
                                    <button
                                        onClick={handleOrder}
                                        className="btn-order">Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
