import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from './header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Brand } from '../apiServices/brand';
import { useSelector } from 'react-redux';
import Partner from './partner';
import Footer from './footer';
import { Shirt } from '../apiServices';

export default function SearchResults() {
    const [dataBrand, setDataBrand] = useState(null);
    const location = useLocation();
    const { searchTerm } = location.state || {};
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const { token } = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDataBrand();
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [selectedPrice, selectedType]);

    const handleRadioChange = (event) => {
        const { value } = event.target;
        const newPrice = value === 'clear' ? null : value;
        setSelectedPrice(newPrice);
    };

    const handleRadioTypeChange = (value) => {
        const newType = value === 'clear' ? null : value;
        setSelectedType(newType);
    };

    const fetchDataBrand = async () => {
        try {
            const response = await Brand.get(token);
            setDataBrand(response.data);
        } catch (error) {
        }
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const params = {
                SearchItem: searchTerm || null,
                BrandId: selectedType || 0,
                MinPrice: 0,
                MaxPrice: selectedPrice || 999999999,
            };
            console.log(params);
            
            const response = await Shirt.get(token, params);
            setData(response.data);
        } catch (error) {
        } finally {
            setTimeout(() => setIsLoading(false), 300);
        }
    };

    const handleBuy = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <>
            <Header></Header>
            <div className="breadcrumb" style={{ width: '70%', marginLeft: '15%' }}>
                <Link to="/home" className="breadcrumb-item-hover">Home</Link>
                <span className="breadcrumb-divider">/</span>
                <span className="breadcrumb-item">Products</span>
            </div>

            <div style={{ width: '70%', marginLeft: '15%', marginTop: '2%', marginBottom: '3%', display: 'flex' }}>
                {/* Sidebar */}
                <div style={{ width: '25%' }}>
                    <div style={{
                        width: '90%',
                        border: '1px solid #ccc',
                        padding: '10px',
                        background: 'rgb(131, 68, 83)',
                        color: 'rgb(255, 255, 255)',
                        borderRadius: '5px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        marginLeft: '5%',
                    }}>
                        Price
                    </div>

                    <div style={{ width: '90%', marginLeft: '5%', marginTop: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>
                            <input
                                type="radio"
                                name="price"
                                onChange={() => handleRadioChange({ target: { value: null } })}
                                checked={selectedPrice === null}
                            /> All
                        </label>
                        <label style={{ display: 'block', marginBottom: '8px' }}>
                            <input
                                type="radio"
                                name="price"
                                value="100"
                                onChange={handleRadioChange}
                                checked={selectedPrice === '100'}
                            /> Below $100
                        </label>
                        <label style={{ display: 'block', marginBottom: '8px' }}>
                            <input
                                type="radio"
                                name="price"
                                value="200"
                                onChange={handleRadioChange}
                                checked={selectedPrice === '200'}
                            /> Below $200
                        </label>
                        <label style={{ display: 'block', marginBottom: '8px' }}>
                            <input
                                type="radio"
                                name="price"
                                value="300"
                                onChange={handleRadioChange}
                                checked={selectedPrice === '300'}
                            /> Below $300
                        </label>
                        <label style={{ display: 'block', marginBottom: '8px' }}>
                            <input
                                type="radio"
                                name="price"
                                value="400"
                                onChange={handleRadioChange}
                                checked={selectedPrice === '400'}
                            /> Below $400
                        </label>
                        <label style={{ display: 'block', marginBottom: '8px' }}>
                            <input
                                type="radio"
                                name="price"
                                value="500"
                                onChange={handleRadioChange}
                                checked={selectedPrice === '500'}
                            /> Below $500
                        </label>
                        <label style={{ display: 'block', marginBottom: '8px' }}>
                            <input
                                type="radio"
                                name="price"
                                value="1000"
                                onChange={handleRadioChange}
                                checked={selectedPrice === '1000'}
                            /> Below $1000
                        </label>
                    </div>

                    <div style={{
                        width: '90%',
                        border: '1px solid #ccc',
                        padding: '10px',
                        background: 'rgb(131, 68, 83)',
                        color: 'rgb(255, 255, 255)',
                        borderRadius: '5px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        marginLeft: '5%',
                    }}>
                        Type
                    </div>

                    <div style={{ width: '90%', marginLeft: '5%', marginTop: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>
                            <input
                                type="radio"
                                name="brand"
                                onChange={() => handleRadioTypeChange('clear')}
                                checked={selectedType === null}
                            /> All
                        </label>
                        {dataBrand?.map((tab) => (
                            <label style={{ display: 'block', marginBottom: '8px' }} key={tab?.id}>
                                <input
                                    type="radio"
                                    name="brand"
                                    onChange={() => handleRadioTypeChange(tab?.id)}
                                    checked={selectedType === tab?.id}
                                /> {tab?.name}
                            </label>
                        ))}
                    </div>
                </div>

                <div style={{ width: '75%' }}>
                    <div className="tab-title">
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <h2 className="h2-title">
                                <FontAwesomeIcon icon={faStar} />
                            </h2>
                        </div>
                    </div>
                    <div className="product-list-home-search">
                        {data?.map((item) => (
                            <div className="product-item-home-search" key={item.item1?.id}>
                                {/* <img className="product-image" src={Shirt.BASEURLIMAGE + item?.item2[0]?.imgPath} alt={item?.item1?.name} /> */}
                                <img
                                    className="product-image-home-search"
                                    src={require('../image/home/462287097_1101780851957342_5037346083786431034_n.jpg')}
                                    alt={item?.item1?.name}
                                    onClick={() => handleProductClick(item?.item1?.id)}
                                />
                                <p style={{ textTransform: 'uppercase', fontSize: '16px', fontWeight: '600' }}>{item?.item1?.name}</p>
                                <p style={{ color: 'red', fontSize: '16px', fontWeight: '600' }}>${item?.item1?.price}</p>
                                <button
                                    className="buy-button"
                                    onClick={() => handleBuy(item.item1.id)}
                                >
                                    Purchase
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ width: '90%', marginLeft: '5%' }}>
                <Partner />
            </div>
            <Footer />
        </>
    );
}
