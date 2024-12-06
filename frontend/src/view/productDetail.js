import { faPlus, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Shirt } from '../apiServices';
import FeedbackDetail from './feedback';
import Footer from './footer';
import Header from './header';
import Instructions from "./instructions";
import { CartApi } from '../apiServices/cart';

const ProductDetail = () => {

    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImagePath, setSelectedImagePath] = useState(null);
    const [selectedSize, setSelectedSize] = useState('27');
    const navigate = useNavigate();
    const [selectedColor, setSelectedColor] = useState("Green");
    const [data, setData] = useState(null);
    const { token } = useSelector(state => state.user);
    const [feedbackCount, setFeedbackCount] = useState(0);
    const userId = useSelector(state => state.user.id);


    useEffect(() => {
        fetchProductDetail();
    }, [id]);

    const updateFeedbackCount = (count) => {
        setFeedbackCount(count);
    };

    const fetchProductDetail = async () => {
        try {
            setIsLoading(true);
            const response = await Shirt.getById(id, token);
            setData(response?.data);
            setSelectedImagePath(response?.data?.item2[0]?.imgPath);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching product detail:', error);
            setIsLoading(false);
        }
    };

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <div>Loading...</div>
            </div>
        );
    }

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    const handleImageClick = (path) => {
        setSelectedImagePath(path);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleAddToCart = () => {
        createCart();
    };

    const handlePurchase = () => {
        navigate('/product/purchase', { state: { newItem } });
    };

    const createCart = async () => {
        try {
            const item = {
                ShirtId: parseInt(id),
                Quantity: parseInt(quantity),
                Color: selectedColor
            };
            setIsLoading(true);
            await CartApi.addItemToCart(token, userId, item);
            setIsLoading(false);
            navigate(`/product/cart`);
        } catch (error) {
            console.error('Error fetching product detail:', error);
            setIsLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'rgba(208,1,27,.08)' }}>
            <Header></Header>
            <div className="breadcrumb" style={{ width: '70%', marginLeft: '15%' }}>
                <Link to="/product" className="breadcrumb-item-hover">Product</Link>
                <span className="breadcrumb-divider">/</span>
                <span className="breadcrumb-item">{data?.item1?.name}</span>
            </div>

            <div style={{ display: 'flex', marginLeft: '15%', width: '70%', backgroundColor: 'white', padding: '1%' }} >
                <div style={{ width: "10%", height: '50vh', overflowY: 'auto', cursor: 'pointer' }}>
                    {Array.isArray(data?.item2) && data?.item2.map((item, index) => (
                        <img
                            key={index}
                            className="product-detail-view-total"
                            // src={Shirt.BASEURLIMAGE + item?.imgPath}
                            src={require('../image/home/462287097_1101780851957342_5037346083786431034_n.jpg')}
                            alt={`Image ${index + 1}`}
                            onClick={() => handleImageClick(item?.imgPath)}
                        />
                    ))}
                </div>
                <div style={{ width: "30%" }}>
                    <img className="product-detail-image"
                        // src={Shirt.BASEURLIMAGE + selectedImagePath}
                        src={require('../image/home/462287097_1101780851957342_5037346083786431034_n.jpg')}
                        alt="Shirt Store Logo" />
                </div>
                <div style={{ width: "55%" }}>
                    <div className="title-image">{data?.item1?.name.toLowerCase()}</div>

                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', paddingTop: '1%' }}>
                        <div style={{ marginRight: '10px', borderRight: '1px solid #ccc', paddingRight: '5px' }}>
                            <span ><b>Evaluate: </b> </span>
                            <span style={{ color: '#fadb14', marginRight: '5px' }}>★</span>
                            <span style={{ color: '#fadb14', marginRight: '5px' }}>★</span>
                            <span style={{ color: '#fadb14', marginRight: '5px' }}>★</span>
                            <span style={{ color: '#fadb14', marginRight: '5px' }}>★</span>
                            <span style={{ color: '#fadb14', marginRight: '5px' }}>★</span>
                        </div>
                        <span style={{ marginRight: '10px', borderRight: '1px solid #ccc', paddingRight: '5px' }}><b>Feedback:</b> {feedbackCount}</span>
                        <span style={{ marginRight: '10px' }}><b>Sold:</b> 5000</span>
                    </div>

                    <div style={{ padding: '4% 0 2% 0', fontSize: '18px' }}>
                        <b>Price:</b> <div className='product-price'>${data?.item1?.price}</div>
                    </div>

                    <div style={{ paddingBottom: '2%', display: 'flex' }}>
                        <div style={{ fontSize: '18px', width: '20%' }}>
                            <b>Return policy</b>
                        </div>
                        <div style={{ fontSize: '16px', width: '80%' }}>
                            <img style={{ height: '2vh', paddingRight: '2%' }} src={require("../image/home/free2.png")} alt={"test"} />
                            Returns within 15 days <i style={{ fontSize: '14px', paddingLeft: '3%' }}>Change your mind for free</i>

                        </div>
                    </div>

                    <div style={{ paddingBottom: '2%', display: 'flex' }}>
                        <div style={{ fontSize: '18px', width: '20%' }}>
                            <b>Transport:</b>
                        </div>
                        <div style={{ fontSize: '16px', width: '80%' }}>
                            <img style={{ height: '2vh', paddingRight: '2%' }} src={require("../image/home/free.png")} alt={"test"} />
                            Free shipping
                        </div>
                    </div>

                    <div style={{ borderBottom: '2px solid #ccc', paddingBottom: '2%' }}>
                        <div style={{ fontSize: '18px' }}>
                            <b>Other models<span style={{ color: 'red' }}> *</span>:</b>
                        </div>
                        <div className="color-picker">
                            <a className={selectedColor === 'Green' ? 'color-selected' : 'color-black'} onClick={() => handleColorChange('Green')}>Green</a>
                            <a className={selectedColor === 'Red' ? 'color-selected' : 'color-black'} onClick={() => handleColorChange('Red')}>Red</a>
                            <a className={selectedColor === 'White' ? 'color-selected' : 'color-black'} onClick={() => handleColorChange('White')}>White</a>
                            <a className={selectedColor === 'Violet' ? 'color-selected' : 'color-black'} onClick={() => handleColorChange('Violet')}>Violet</a>
                            <a className={selectedColor === 'Yellow' ? 'color-selected' : 'color-black'} onClick={() => handleColorChange('Yellow')}>Yellow</a>
                            <a className={selectedColor === 'Black' ? 'color-selected' : 'color-black'} onClick={() => handleColorChange('Black')}>Black</a>
                        </div>
                    </div>

                    <div style={{ paddingTop: '2%' }}>
                        <div style={{ width: '50%', display: 'flex' }} >
                            <div style={{ fontSize: '16px', width: '50%' }}>
                                <b>Size
                                    <span style={{ color: 'red' }}> *</span>:</b>
                            </div>
                            <div style={{ width: '100%' }}>
                                <select className='select' value={selectedSize} onChange={handleSizeChange}>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                    <option value="32">32</option>
                                    <option value="33">33</option>
                                    <option value="34">34</option>
                                </select>
                                <div>
                                    <span className='instruction'
                                        onClick={togglePopup}>
                                        Instructions for choosing size</span>
                                    {isPopupVisible && <Instructions isPopupVisible={isPopupVisible} togglePopup={togglePopup} />}
                                </div>
                            </div>
                        </div>

                        <div style={{ width: '60%', paddingTop: '3%', display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: '40%', fontSize: '16px' }}>
                                <b>Quantity<span style={{ color: 'red' }}> *</span>:</b>
                            </div>
                            <div className="quantity-selector">
                                <button className="decrement-btn" onClick={decrementQuantity} style={{ background: '#ffffff', border: '1px solid #ccc', borderRight: 'none' }}>-</button>
                                <input
                                    style={{ outline: 'none' }}
                                    type="number"
                                    className="quantity-input"
                                    value={quantity}
                                    min={1}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                />
                                <button className="increment-btn" onClick={incrementQuantity} style={{ background: '#ffffff', border: '1px solid #ccc', borderLeft: 'none' }}>+</button>
                            </div>

                            {/* <div style={{ paddingLeft: '5%' }}> products available</div> */}
                        </div>

                    </div>

                    <div style={{ paddingTop: '4%', display: 'flex', paddingBottom: '5%' }}>
                        <div style={{ width: '50%', padding: ' 0 2.5%' }} onClick={handlePurchase}>
                            <button className='btn-signup'><FontAwesomeIcon icon={faShoppingBasket} /> Purchase</button>
                        </div>
                        <div style={{ width: '45%', padding: '0% 0 0 6.5%' }} onClick={handleAddToCart}>
                            <button className='btn-add'><FontAwesomeIcon icon={faPlus} /> Add to cart</button>
                        </div>

                    </div>

                    <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '0%' }}></div>

                </div>
            </div>
            <div style={{ borderBottom: '1px solid #ccc', paddingTop: '2%' }}></div>
            <FeedbackDetail id={id} updateFeedbackCount={updateFeedbackCount}></FeedbackDetail>
            <Footer></Footer>
        </div>
    );
};

export default ProductDetail;
