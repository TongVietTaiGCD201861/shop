import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Brand } from '../apiServices/brand';
import PopupCart from './popupCart';

const ProductHome = ({ dataBrands }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(null);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const { token } = useSelector((state) => state.user);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    useEffect(() => {
        if (dataBrands?.length > 0) {
            const firstBrandId = dataBrands[0]?.id;
            setActiveTab(firstBrandId);
            fetchData(firstBrandId);
        }
    }, [dataBrands]);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        fetchData(tabId);
    };

    const fetchData = async (id) => {
        setError(null);
        try {
            const response = await Brand.getByBrandId(token, id);
            setData(response.data || []);
        } catch (error) {
            setError(error.message || 'Error fetching data');
        }
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleBuy = (productId) => {
        setSelectedProductId(productId);
        setIsPopupVisible(true);
    };

    return (
        <div className="product-home" style={{ paddingTop: '15px', paddingBottom: '15px' }}>
            {dataBrands?.length > 0 ? (
                <div>
                    <div className="tab-title">
                        <h2 className="h2-title">
                            <FontAwesomeIcon icon={faStar} />
                        </h2>
                        <ul className="nav nav-tabs" role="tablist">
                            {dataBrands.map((tab) => (
                                <li
                                    key={tab.id}
                                    role="presentation"
                                    className={activeTab === tab.id ? 'active' : ''}
                                    onClick={() => handleTabClick(tab.id)}
                                >
                                    <a aria-controls={tab.ariaControls} role="tab" data-toggle="tab">
                                        {tab.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        {data.length === 0 ? (
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '35px' }}>No products for sale</div>
                        ) : (
                            <div className="product-list-home">
                                {data.slice(0, 5).map((item) => (
                                    <div className="product-item-home" key={item.item1?.id}>
                                        {/* <img className="product-image" src={Shirt.BASEURLIMAGE + item?.item2[0]?.imgPath} alt={item?.item1?.name} /> */}
                                        <img
                                            className="product-image-home"
                                            src={require('../image/home/462287097_1101780851957342_5037346083786431034_n.jpg')}
                                            alt={item?.item1?.name}
                                            onClick={() => handleProductClick(item?.item1?.id)}
                                        />
                                        <p style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{item?.item1?.name}</p>
                                        <p style={{ color: 'red', fontSize: '22px', fontWeight: '600' }}>${item?.item1?.price}</p>
                                        <button
                                            className="buy-button"
                                            onClick={() => handleBuy(item.item1.id)}
                                        >
                                            Purchase
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '35px' }}>
                    There are currently no brand available.
                </div>
            )}{isPopupVisible && (
                <PopupCart
                    productId={selectedProductId}
                    onClose={() => setIsPopupVisible(false)}
                />
            )}
        </div>
    );
};

export default ProductHome;
