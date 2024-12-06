import { faAngleDown, faAngleUp, faChevronLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shirt } from '../../apiServices';

export default function AdminHeader() {
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    const userName = useSelector(state => state.user.firstName);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === '/admin/order') setActiveTab('ORDERS');
        else if (currentPath === '/admin/product') setActiveTab('PRODUCTS');
        else if (currentPath === '/admin/discount') setActiveTab('DISCOUNTS');
        else if (currentPath === '/admin/brand') setActiveTab('BRANDS');
    }, [location]);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleOpenProfile = () => {
        navigate(`/profile`);
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

    const handleBackToHomw = () => {
        navigate(`/home`);
    }

    const getTabStyle = (tab) => ({
        width: '10%',
        cursor: 'pointer',
        color: activeTab === tab ? 'yellow' : '#ffffff99',
        textAlign: 'center',
        padding: '10px 0',
    });

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
                                        <button onClick={() => {/* Xử lý thông tin người dùng */ }}>User information</button>
                                    </div>
                                </div>
                            )}
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
                        <div style={getTabStyle('PRODUCTS')} onClick={() => handleTabClick('PRODUCTS', '/admin/product')}>
                            PRODUCTS
                        </div>
                        <div style={getTabStyle('ORDERS')} onClick={() => handleTabClick('ORDERS', '/admin/order')}>
                            ORDERS
                        </div>
                        <div style={getTabStyle('BRANDS')} onClick={() => handleTabClick('BRANDS', '/admin/brand')}>
                            BRANDS
                        </div>
                        <div style={getTabStyle('DISCOUNTS')} onClick={() => handleTabClick('DISCOUNTS', '/admin/discount')}>
                            DISCOUNTS
                        </div>
                    </div>
                </div>
                <div style={{
                    display: 'flex', alignItems: 'center', width: '70%', marginLeft: '15%', marginTop: '15px'
                }} className='back-to-cart'
                    onClick={handleBackToHomw}
                >
                    <FontAwesomeIcon icon={faChevronLeft} color='green' />
                    <div>Back to purchasing channel</div>
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