import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shirt } from '../apiServices';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import CreateProduct from './createProduct';
import View from './view';

export default function ProductManagement() {

    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { token } = useSelector(state => state.user);
    const role = useSelector(state => state.user.role);
    const [searchTerm, setSearchTerm] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const [showPopupDelete, setShowPopupDelete] = useState(false);
    const [showPopupCreate, setShowPopupCreate] = useState(false);
    const [showPopupEdit, setShowPopupEdit] = useState(false);
    const [showView, setShowView] = useState(false);
    const [id, setId] = useState(null);
    const [deletingProductId, setDeletingProductId] = useState(null);
    

    useEffect(() => {
        fetchData(searchTerm);
    }, []);

    const fetchData = async (searchItem) => {
        setIsLoading(true);
        try {
            const response = await Shirt.get(token, searchItem);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };


    const handleCart = () => {
        navigate(`/product/cart`);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        fetchData(searchTerm);
    };

    const handleLogout = () => {
        setShowPopup(false);
        setShowLogoutConfirmation(true);
    };

    const confirmLogout = () => {
        navigate(`/login`);
        dispatch(logout());

    };

    const cancelLogout = () => {
        setShowLogoutConfirmation(false);
    };

    const handleManagement = () => {
        navigate(`/admin/order-management`);
    };

    const handleProductManagement = () => {
        navigate(`/admin/product-management`);
    };

    const handleDelete = (id) => {
        setShowPopupDelete(true);
        setDeletingProductId(id);
    };

    const handleClosePopup = () => {
        setShowPopupDelete(false);
        setDeletingProductId(null);
    };

    const handleEditClick = (id) => {
        setShowPopupEdit(true)
        setId(id);
    }

    const handleEditClose = () => {
        setShowPopupEdit(false)
        fetchData(searchTerm);
    }

    const handleCreate = () => {
        setShowPopupCreate(true);
    };

    const handleCloseCreate = () => {
        setShowPopupCreate(false);
        fetchData(searchTerm);
    };

    const handleView = (id) => {
        setShowView(true)
        setId(id);
    }

    const handleCloseView = () => {
        setShowView(false)
        setId(id);
    }

    const handleDeleteProduct = () => {
        fetchDeleteProduct(deletingProductId);
        setShowPopupDelete(false);
    }

    const fetchDeleteProduct = async (id) => {
        try {
            const response = await Shirt._delete(id, token);
            setIsLoading(!isLoading);
            fetchData(searchTerm);
        } catch (error) {
            console.error('Error fetching product detail:', error);
            setIsLoading(!isLoading);
        }
    };

    return (
        <>
            <div className="header_1">
                <div className="header">
                    <div className="header" style={{ padding: '5px 0', width: '80% !important' }}>
                        <div className="logo-container" onClick={() => window.location.href = "http://localhost:3000/product"} style={{ width: '70%' }}>
                            <div style={{ borderRight: '1px solid #ccc', paddingRight: '2%' }}>
                                <img className="logo" src="https://img.freepik.com/premium-vector/tshirt-logo-clothing-logo-apparel-store-icon-fashion-logo-design-tshirt-icon-template_657888-112.jpg" alt="Shirt Store Logo" />
                                <span className="store-name">Shirt Store</span>
                            </div>
                            <div style={{ paddingLeft: '10%', fontSize: '24px' }}>
                                <div>PRODUCT MANAGEMENT</div>
                            </div>
                        </div>
                    </div>

                    <div className="cart">
                        <FontAwesomeIcon icon={faShoppingCart} className="search-icon" onClick={() => handleCart()} />
                    </div>

                    <div className="cart">
                        <FontAwesomeIcon icon={faUser} className="search-icon" onClick={togglePopup} />
                        {showPopup && (
                            <div className="popup1" ref={popupRef}>
                                <div className="popup-content1">
                                    <button onClick={handleLogout}>Log out</button>
                                    <button onClick={() => {/* Xử lý thông tin người dùng */ }}>User information</button>
                                    {/* {role === 1 && ( */}
                                    <div>
                                        <button onClick={handleManagement}>Commodity management</button>
                                        <button onClick={handleProductManagement}>Product management</button>

                                    </div>
                                    {/* )} */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div>

                <div className="box-container" style={{ marginTop: '2%', width: '90%', marginLeft: '5%', boxShadow: '0 0 10px rgb(0 0 0 / 61%)' }}>
                    <div className="container-product" style={{ width: "100%" }}>

                        <div className="cart1">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Please enter the product name to search..."
                                className="search-input-product"
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="send-button" onClick={handleSearch} style={{ marginRight: '1%' }}>Search</button>
                            <button className="send-button" onClick={handleCreate}>Create</button>
                        </div>

                    </div>

                </div>

                <div className="product-list-management1"  >
                    <div className="table-container1">
                        <div className="table-row1 header-management1" style={{ backgroundColor: "#f2f2f2", fontWeight: "bold" }}>
                            <div className="table-cell1 cell-management1" style={{ width: "5%", textAlign: 'center' }}>STT</div>
                            <div className="table-cell1 cell-management1" style={{ width: "60%" }}>Name</div>
                            <div className="table-cell1 cell-management1" style={{ width: "10%", textAlign: 'center' }}>Price</div>
                            <div className="table-cell1 cell-management1" style={{ width: "25%", textAlign: 'center' }}>Action</div>
                        </div>
                        {data && data?.length > 0 ? (
                            data?.map((product, index) => (
                                <div className="table-row1 header-management2" key={index}>
                                    <div className="table-cell1 cell-management1" style={{ width: "5%", textAlign: 'center' }}>{index + 1}</div>
                                    <div className="table-cell1 cell-management1" style={{ width: "60%" }}>{product?.item1?.name}</div>
                                    <div className="table-cell1 cell-management1" style={{ width: "10%", textAlign: 'center' }}>{product?.item1?.price}</div>
                                    <div className="table-cell1 cell-management1" style={{ width: "25%", textAlign: 'center' }}>
                                        <button className="button-edit" onClick={() => handleEditClick(product?.item1?.id)}>Edit</button>
                                        <button className="button-edit" onClick={() => handleDelete(product?.item1?.id)}>Delete</button>
                                        <button className="button-edit" onClick={() => handleView(product?.item1?.id)}>View</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-data-message">No data available</div>
                        )}
                    </div>
                </div>

                {showPopupDelete && (
                    <div className="popup">
                        <h2>Delete</h2>
                        <div>Are you sure you want to delete this product?</div>
                        <div style={{ marginTop: '3%', display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={handleDeleteProduct}>Confirm</button>
                            <button onClick={handleClosePopup}>Close</button>
                        </div>
                    </div>
                )}

                {showPopupCreate && (
                    <CreateProduct onClose={handleCloseCreate} action="create" />
                )}

                {showPopupEdit && (
                    <CreateProduct onClose={handleEditClose} id={id} action="update" />
                )}

                {showView && (
                    <View onClose={handleCloseView} id={id} />
                )}
            </div>

            <footer>
                <div className="footer-content1">
                    <h3>code opacity</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo iste corrupti doloribus odio sed!</p>
                    <ul className="socials1">
                        <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                    </ul>
                </div>
                <div className="footer-bottom1">
                    <p>copyright &copy;2024 codeOpacity. designed by <span>TaiTV</span></p>
                </div>
            </footer>
        </>
    )
}
