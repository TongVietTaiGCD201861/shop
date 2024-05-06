import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { PurchaseProduct } from "../apiServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";

export default function OrderManagement() {
    const [selectedManagementId, setSelectedManagementId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const { token } = useSelector(state => state.user);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const role = useSelector(state => state.user.role);
    console.log(role);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await PurchaseProduct.get(token);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    const handleEditClick = (managementId, status) => {
        setSelectedManagementId(managementId);
        setSelectedStatus(status);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setSelectedManagementId(null);
        setShowPopup(false);
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        console.log(event.target.value);
    };

    const handleSaveStatus = () => {
        update(selectedManagementId, selectedStatus)
        handleClosePopup();
    };

    const update = async (id, status) => {
        setIsLoading(true);
        try {
            await PurchaseProduct.updateStatus(id, status, token);
            setIsLoading(false);
            fetchData();
        } catch (error) {
            setError(error);
            setIsLoading(false);
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

    const statusMapping = {
        1: 'Preparing goods',
        2: 'In transit',
        3: 'Delivered successfully',
        4: 'Return',
        5: 'Delivery failed'
    };


    return (
        <>
            <div className="header_1">
                <div className="header" style={{ padding: '25px 0', width: '80% !important' }}>
                    <div className="logo-container" onClick={() => window.location.href = "http://localhost:3000/product"} style={{ width: '50%' }}>
                        <div style={{ borderRight: '1px solid #ccc', paddingRight: '2%' }}>
                            <img className="logo" src="https://img.freepik.com/premium-vector/tshirt-logo-clothing-logo-apparel-store-icon-fashion-logo-design-tshirt-icon-template_657888-112.jpg" alt="Shirt Store Logo" />
                            <span className="store-name">Shirt Store</span>
                        </div>
                        <div style={{ paddingLeft: '10%', fontSize: '30px' }}>
                            <div>ORDER MANAGEMENT</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="breadcrumb">
                <Link to="/product" className="breadcrumb-item-hover">Product</Link>
                <span className="breadcrumb-divider">/</span>
                <span className="breadcrumb-item">Order management</span>
            </div>

            <div className="product-list-management">
                <div className="table-container">
                    <div className="table-row header-management">
                        <div className="table-cell cell-management">Name</div>
                        <div className="table-cell cell-management">Size</div>
                        <div className="table-cell cell-management">Price</div>
                        <div className="table-cell cell-management">Color</div>
                        <div className="table-cell cell-management">Total</div>
                        <div className="table-cell cell-management">Buyer name</div>
                        <div className="table-cell cell-management">Address</div>
                        <div className="table-cell cell-management">Phone number</div>
                        <div className="table-cell cell-management">Payment method</div>
                        <div className="table-cell cell-management">Buyer account</div>
                        <div className="table-cell cell-management">Status</div>
                        <div className="table-cell cell-management">Action</div>
                    </div>
                    {data && data.map(management => (
                        <div className="table-row">
                            <div className="table-cell cell-management">{management?.name}</div>
                            <div className="table-cell cell-management">{management?.size}</div>
                            <div className="table-cell cell-management">{management?.price}</div>
                            <div className="table-cell cell-management">{management?.color}</div>
                            <div className="table-cell cell-management">{management?.total}</div>
                            <div className="table-cell cell-management">{management?.userName}</div>
                            <div className="table-cell cell-management">{management?.address}</div>
                            <div className="table-cell cell-management">{management?.phoneNumber}</div>
                            <div className="table-cell cell-management">{management?.paymentMethod}</div>
                            <div className="table-cell cell-management">{management?.accountBuy}</div>
                            <div className="table-cell cell-management">{statusMapping[management.status]}</div>
                            <div className="table-cell cell-management">
                                <button className="button-edit" onClick={() => handleEditClick(management?.id, management?.status)}>Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
                {showPopup && (
                    <div className="popup">
                        <h2>Update status</h2>
                        <select id="status" value={selectedStatus} onChange={handleStatusChange}>
                            <option value={1}>Preparing goods</option>
                            <option value={2}>In transit</option>
                            <option value={3}>Delivered successfully</option>
                            <option value={4}>Return</option>
                            <option value={5}>Delivery failed</option>
                        </select>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={handleSaveStatus}>Confirm</button>
                            <button onClick={handleClosePopup}>Close</button>
                        </div>
                    </div>
                )}
            </div>
            <footer style={{
                position: "fixed",
                bottom: "0",
                left: "0",
                right: "0"
            }}>
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