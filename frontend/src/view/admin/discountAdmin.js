import { useSelector } from "react-redux";
import AdminHeader from "./headerAdmin";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faRemove, faSearch } from "@fortawesome/free-solid-svg-icons";
import { DatePicker } from "antd";
import "antd/dist/reset.css";
import { faEdge } from "@fortawesome/free-brands-svg-icons";
import DiscountDetail from "./detail/discountDetail";
import { Discount } from "../../apiServices/discountApiEndPoint";
import Footer from "../footer";

export default function DiscountAdmin() {

    const role = useSelector(state => state.user.role);
    const [searchTerm, setSearchTerm] = useState("");
    const [code, setCode] = useState("");
    const [reduced, setReduced] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [expiryDate, setExpiryDate] = useState(null);
    const [operatingStatus, setOperatingStatus] = useState(0);
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [discountId, setDiscountId] = useState(false);
    const { token } = useSelector(state => state.user);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData(null, null, 0, null, null);
    }, []);

    const handleSearch = () => {
        fetchData(searchTerm, code, reduced, fromDate, toDate, expiryDate);
    };

    const fetchData = async (searchTerm, code, reduced, fromDate, toDate, expiryDate) => {
        setIsLoading(true);
        try {
            const params = {
                Name: searchTerm || null,
                Code: code || null,
                Reduced: reduced || 0,
                FromDate: fromDate || null,
                ToDate: toDate || null,
                ExpiryDate: expiryDate || null,
            };
            const response = await Discount.get(token, params);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    console.log(data);


    const handleShowPopup = (id) => {
        setDiscountId(id);
        setIsModalOpen(true);
    };

    const handleClosePopup = () => {
        setIsModalOpen(false);
        fetchData();
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this discount?");
        if (isConfirmed) {
            setIsLoading(true);
            try {
                await Discount.deleteDiscount(token, id);
                fetchData();
                setIsLoading(false);
            } catch (error) {
                console.error("Error deleting brand:", error);
                setIsLoading(false);
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}/${month}/${day} ${hours}:${minutes}`;
    };

    return (
        <>
            <AdminHeader />

            {role === 1 ? (
                <div style={{ width: '70%', marginLeft: '15%' }}>
                    <h1 className="title-admin">Manages coupon codes</h1>
                    <div style={{
                        marginTop: '2%',
                        width: '100%',
                        border: '1px solid #ccc',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '0.5rem',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ position: 'relative', width: '50%', margin: '1%' }}>
                                <input
                                    type="text"
                                    placeholder="Search by discount name"
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem 2rem 0.5rem 0.5rem',
                                        boxSizing: 'border-box',
                                        border: '1px solid #944b44',
                                        borderRadius: '0.5rem',
                                    }}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    style={{
                                        position: 'absolute',
                                        right: '0.5rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#888',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleSearch}
                                />
                            </div>
                            <div style={{ position: 'relative', width: '50%', margin: '1%' }}>
                                <input
                                    type="text"
                                    placeholder="Search by discount code"
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem 2rem 0.5rem 0.5rem',
                                        boxSizing: 'border-box',
                                        border: '1px solid #944b44',
                                        borderRadius: '0.5rem',
                                    }}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    style={{
                                        position: 'absolute',
                                        right: '0.5rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#888',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleSearch}
                                />
                            </div>

                            <div style={{ position: 'relative', width: '50%', margin: '1%' }}>
                                <input
                                    type="text"
                                    placeholder="Search by discount reduced"
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem 2rem 0.5rem 0.5rem',
                                        boxSizing: 'border-box',
                                        border: '1px solid #944b44',
                                        borderRadius: '0.5rem',
                                    }}
                                    value={reduced}
                                    onChange={(e) => setReduced(e.target.value)}
                                />
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    style={{
                                        position: 'absolute',
                                        right: '0.5rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#888',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleSearch}
                                />
                            </div>
                            <div style={{ width: '50%', margin: '1%' }}>
                                {/* <select
                                    value={operatingStatus}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        setOperatingStatus(value);
                                        fetchData(searchTerm, value);
                                    }}
                                    style={{
                                        width: "100%",
                                        padding: "0.5rem 2rem 0.5rem 0.5rem",
                                        boxSizing: "border-box",
                                        border: "1px solid #944b44",
                                        borderRadius: "0.5rem",
                                    }}
                                >
                                    <option value="0">--Select all--</option>
                                    <option value="1">Active</option>
                                    <option value="2">Inactive</option>
                                </select> */}
                            </div>
                        </div>

                        <div style={{ display: 'flex' }}>
                            <div style={{ position: "relative", width: '50%', margin: '1%' }}>
                                <DatePicker
                                    style={{
                                        width: "100%",
                                        border: "1px solid #944b44",
                                        borderRadius: "0.5rem",
                                        padding: '0.5rem 2rem 0.5rem 0.5rem',
                                        boxSizing: 'border-box'
                                    }}
                                    placeholder="From Date"
                                    value={fromDate}
                                    onChange={(date) => setFromDate(date)}
                                />
                            </div>

                            {/* Search by To Date */}
                            <div style={{ position: "relative", width: '50%', margin: '1%' }}>
                                <DatePicker
                                    style={{
                                        width: "100%",
                                        border: "1px solid #944b44",
                                        borderRadius: "0.5rem",
                                        padding: '0.5rem 2rem 0.5rem 0.5rem',
                                        boxSizing: 'border-box'
                                    }}
                                    placeholder="To Date"
                                    value={toDate}
                                    onChange={(date) => setToDate(date)}
                                />
                            </div>

                            <div style={{ position: "relative", width: '50%', margin: '1%' }}>
                                <DatePicker
                                    style={{
                                        width: "100%",
                                        border: "1px solid #944b44",
                                        borderRadius: "0.5rem",
                                        padding: '0.5rem 2rem 0.5rem 0.5rem',
                                        boxSizing: 'border-box'
                                    }}
                                    placeholder="Expiry Date"
                                    value={expiryDate}
                                    onChange={(date) => setExpiryDate(date)}
                                />
                            </div>
                            <div style={{ position: "relative", width: '50%', margin: '1%', display: 'flex', justifyContent: 'flex-end' }}>
                                <div style={{ width: '100%', display: 'flex' }}>
                                    <button className='btn-create-discount' style={{ marginRight: '4%', background: 'blue' }} onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /> Search</button>
                                    <button className='btn-create-discount' onClick={handleShowPopup}><FontAwesomeIcon icon={faPlus} /> Add new</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="cart-table2" style={{ marginTop: '2%', border: '1px solid #ccc' }}>
                        <thead style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
                            <tr style={{ width: '100%' }}>
                                <th style={{ width: '5%' }}>ID</th>
                                <th style={{ width: '10%' }}>Name</th>
                                <th style={{ width: '30%' }}>Description</th>
                                <th style={{ width: '10%' }}>Code</th>
                                <th style={{ width: '10%' }}>Created Date</th>
                                <th style={{ width: '10%' }}>Updated Date</th>
                                <th style={{ width: '10%' }}>ExpiryDate</th>
                                <th style={{ width: '5%' }}>Reduced</th>
                                <th style={{ width: '10%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 ? (
                                data?.map((item) => (
                                    <tr >
                                        <td>{item?.id}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.description}</td>
                                        <td>{item?.code}</td>
                                        <td>{formatDate(item?.createdDate)}</td>
                                        <td>{formatDate(item?.updatedDate)}</td>
                                        <td>{formatDate(item?.expiry)}</td>
                                        <td>{item?.valueReduced}</td>
                                        <td>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                                <FontAwesomeIcon className="icon-edit-admin" icon={faEdit} onClick={() => handleShowPopup(1)} />
                                                <FontAwesomeIcon
                                                    className="icon-remove-admin"
                                                    icon={faRemove}
                                                    onClick={() => handleDelete(item?.id)}
                                                />
                                                {/* <FontAwesomeIcon
                                                    className="icon-remove-admin"
                                                    icon={faEdge}
                                                /> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))) : (
                                <tr>
                                    <td colSpan="9" style={{ textAlign: 'center' }}>No brands available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h1>You have no authority</h1>
            )}
            <Footer></Footer>
            <DiscountDetail
                isOpen={isModalOpen}
                onClose={handleClosePopup}
                id={discountId}
            />
        </>
    );
}