import { faAngleDown, faAngleUp, faPhoneVolume, faSearch, faShoppingCart, faTruckFast, faUser, faVcard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shirt } from '../apiServices';
import { logout } from '../store/actions/user';

export default function Header() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [dataCount, setDataCount] = useState(null);
    const [error, setError] = useState(null);
    const { token } = useSelector(state => state.user);
    const role = useSelector(state => state.user.role);
    const [searchTerm, setSearchTerm] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupOrder, setShowPopupOrder] = useState(false);
    const popupRef = useRef(null);
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    const userName = useSelector(state => state.user.firstName);
    const userId = useSelector(state => state.user.id);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        fetchData();
        const currentPath = location.pathname;
        if (currentPath === '/home') setActiveTab('HOME');
        else if (currentPath === '/product') setActiveTab('PRODUCT');
        else if (/^\/product\/\d+$/.test(currentPath)) {
            setActiveTab('PRODUCT');
        }
    }, [location]);

    const fetchData = async () => {
        // setIsLoading(true);
        try {
            // const response = await Shirt.get(token, searchItem);
            const response = await Shirt.getCountCart(userId, token);

            setDataCount(response.data);

            // setIsLoading(false);
        } catch (error) {
            setError(error);
            // setIsLoading(false);
        }
    };

    const handleCart = () => {
        navigate(`/product/cart`);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleOpenProfile = () => {
        navigate(`/profile`);
    };

    const handleChangeAdmin = () => {
        navigate(`/admin/product`);
    };

    const handleLogout = () => {
        setShowPopup(false);
        setShowLogoutConfirmation(true);
    };

    const cancelLogout = () => {
        setShowLogoutConfirmation(false);
    };

    const confirmLogout = () => {
        navigate(`/login`);
        dispatch(logout());

    };

    const handleTabClick = (tab, path) => {
        setActiveTab(tab);
        navigate(path);
    };

    const getTabStyle = (tab) => ({
        width: '10%',
        cursor: 'pointer',
        color: activeTab === tab ? 'yellow' : '#ffffff99',
        textAlign: 'center',
        padding: '10px 0',
    });

    const handleSearch = () => {
        if (searchTerm) {
            const currentPath = location.pathname;
            if (currentPath !== '/product') {
                navigate('/product', { state: { searchTerm } });
            } else {
                fetchData();
            }
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <div className='component_header'>
                <div style={{ width: '100%', padding: '5px', background: 'rgb(219 214 214)' }}>
                    <div style={{ display: 'flex', width: '70%', marginLeft: '15%' }}>
                        <div style={{ width: '90%' }}>
                            Hello customer <b>{userName}</b>
                        </div>
                        <div style={{ width: '10%', display: 'flex', gap: '5px', alignItems: 'center' }}>
                            <div onClick={handleOpenProfile}>
                                <FontAwesomeIcon icon={faUser} className="search-icon" />
                            </div>
                            Account
                            {!showPopup && (
                                <FontAwesomeIcon icon={faAngleDown} style={{ cursor: 'pointer' }} onClick={togglePopup} />
                            )}
                            {showPopup && (
                                <FontAwesomeIcon icon={faAngleUp} style={{ cursor: 'pointer' }} onClick={togglePopup} />
                            )}
                            {showPopup && (
                                <div className="popup1" ref={popupRef}>
                                    <div className="popup-content1">
                                        <button onClick={handleLogout}>Log out</button>
                                        {role === 1 && (
                                            <button onClick={handleChangeAdmin}>Admin page</button>
                                        )}
                                        <button onClick={() => {/* Xử lý thông tin người dùng */ }}>User information</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="header_1">
                    <div className="header">
                        <div className="logo-container" onClick={() => window.location.href = "http://localhost:3000/home"} style={{ cursor: 'pointer' }}>
                            <img src="//bizweb.dktcdn.net/100/113/556/themes/161811/assets/logo.png?1676963410531" alt='maxxshop' />
                        </div>
                        <div className='header_hotline' style={{ width: '15%' }}>
                            <FontAwesomeIcon icon={faPhoneVolume} style={{ cursor: 'pointer' }} />
                            <div>
                                <div>HOTLINE</div>
                                <div>19008198</div>
                            </div>
                        </div>
                        <div className='header_hotline' style={{ width: '20%' }}>
                            <FontAwesomeIcon icon={faTruckFast} style={{ cursor: 'pointer' }} />
                            <div>
                                <div>FREE SHIPPING</div>
                                <div>On-site - Nationwide</div>
                            </div>
                        </div>

                        <div className='header_hotline' style={{ width: '20%' }}>
                            <FontAwesomeIcon icon={faVcard} style={{ cursor: 'pointer' }} />
                            <div>
                                <div>PAYMENT METHOD</div>
                                <div>Dynamic Payment</div>
                            </div>
                        </div>
                        <div className='header_hotline' style={{ width: '20%', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faShoppingCart} className="search-icon" onClick={() => handleCart()} style={{ cursor: 'pointer' }} />
                            <b>{dataCount}</b>Products
                        </div>
                    </div>
                </div>
                <div style={{ background: '#834453', color: '#ffffff' }}>
                    <div
                        style={{
                            width: '70%',
                            marginLeft: '15%',
                            alignItems: 'center',
                            display: 'flex',
                            height: '55px',
                            justifyContent: 'center',
                        }}
                    >
                        <div style={getTabStyle('HOME')} onClick={() => handleTabClick('HOME', '/home')}>
                            HOME
                        </div>
                        <div style={getTabStyle('PRODUCT')} onClick={() => handleTabClick('PRODUCT', '/product')}>
                            PRODUCT
                        </div>
                        {/* <div style={getTabStyle('CONTACT')} onClick={() => handleTabClick('CONTACT', '/contact')}>
                            CONTACT
                        </div> */}
                        <div style={{ width: '50%' }}>
                            <div className="cart1">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Search..."
                                    className="search-input-home"
                                />
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="search-icon-home"
                                    onClick={handleSearch}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showLogoutConfirmation && (
                <div className="logout-confirmation" style={{ background: '#ffffff' }}>
                    <p>Are you sure you want to sign out?</p>
                    <button onClick={confirmLogout}>Agree</button>
                    <button onClick={cancelLogout}>Cancel</button>
                </div>
            )}
        </>
    );
}