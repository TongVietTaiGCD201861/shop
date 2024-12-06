import { useSelector } from "react-redux";
import AdminHeader from "./headerAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faRemove, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Brand } from "../../apiServices/brand";
import BrandDetail from "./detail/brandDetail";
import BrandStatus from "./detail/brandStatus";
import { faEdge } from "@fortawesome/free-brands-svg-icons";
import Footer from "../footer";

export default function BrandAdmin() {
    const role = useSelector(state => state.user.role);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const { token } = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState("");
    const [operatingStatus, setOperatingStatus] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenStatus, setIsModalOpenStatus] = useState(false);
    const [brandId, setBrandId] = useState(0);
    const [operatingStatusDT, setOperatingStatusDT] = useState(1);
    const [operatingStatusDTST, setOperatingStatusDTST] = useState(1);
    const [descriptionDT, setDescriptionDT] = useState('');
    const [nameDT, setNameDT] = useState('');

    useEffect(() => {
        fetchData(null, 0);
    }, []);

    const fetchData = async (name, status) => {
        setIsLoading(true);
        try {
            const params = { Name: name, OperatingStatus: status };
            const response = await Brand.get(token, params);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    const handleSearch = () => {
        fetchData(searchTerm, operatingStatus);
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

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this brand?");
        if (isConfirmed) {
            setIsLoading(true);
            try {
                await Brand.deleteBrand(token, id);
                fetchData(searchTerm, operatingStatus);
                setIsLoading(false);
            } catch (error) {
                console.error("Error deleting brand:", error);
                setIsLoading(false);
            }
        }
    };

    const handleShowPopup = (id, name, description, operatingStatus) => {
        setBrandId(id);
        setNameDT(name);
        setDescriptionDT(description);
        setOperatingStatusDT(operatingStatus);
        setIsModalOpen(true);

    };

    const handleClosePopup = () => {
        setIsModalOpen(false);
        fetchData(null, 0);
    };

    const handleUpdateStatus = (id, operatingStatus) => {
        setBrandId(id);
        setOperatingStatusDTST(operatingStatus);
        setIsModalOpenStatus(true);
    };

    const handleCloseUpdateStatus = () => {
        setOperatingStatusDT(null);
        setIsModalOpenStatus(false);
        fetchData(null, 0);
    };

    return (
        <>
            <AdminHeader />
            {role === 1 ? (
                <div style={{ width: '70%', marginLeft: '15%' }}>
                    <h1 className="title-admin">Brands Management</h1>
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
                                    placeholder="Search by brand name"
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
                            <div style={{ width: '50%', margin: '1%' }}>
                                <select
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
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '5px', marginRight: '1%' }}>
                            <button className='btn-create' onClick={handleShowPopup}><FontAwesomeIcon icon={faPlus} /> Add new</button>
                        </div>
                    </div>
                    <table className="cart-table2" style={{ marginTop: '2%', border: '1px solid #ccc' }}>
                        <thead style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
                            <tr style={{ width: '100%' }}>
                                <th style={{ width: '5%' }}>ID</th>
                                <th style={{ width: '20%' }}>Brand name</th>
                                <th style={{ width: '25%' }}>Description</th>
                                <th style={{ width: '15%' }}>CreatedDate</th>
                                <th style={{ width: '15%' }}>UpdatedDate</th>
                                <th style={{ width: '10%' }}>Operating status</th>
                                <th style={{ width: '10%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 ? (
                                data?.map((item) => (
                                    <tr key={item?.id}>
                                        <td>{item?.id}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.description}</td>
                                        <td>{formatDate(item?.createdDate)}</td>
                                        <td>{formatDate(item?.updatedDate)}</td>
                                        <td
                                            style={{
                                                color: item?.operatingStatus === 1 ? 'green' : 'red',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {item?.operatingStatus === 1 ? 'Active' : 'Inactive'}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                                <FontAwesomeIcon className="icon-edit-admin" icon={faEdit}
                                                    onClick={() => handleShowPopup(item?.id, item?.name, item?.description, item?.operatingStatus)} />
                                                <FontAwesomeIcon
                                                    className="icon-remove-admin"
                                                    icon={faRemove}
                                                    onClick={() => handleDelete(item?.id)}
                                                />
                                                <FontAwesomeIcon
                                                    className="icon-remove-admin"
                                                    icon={faEdge}
                                                    onClick={() => handleUpdateStatus(item?.id, item?.operatingStatus)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center' }}>No brands available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h1>You have no authority</h1>
            )}
            <Footer></Footer>
            <BrandDetail
                isOpen={isModalOpen}
                onClose={handleClosePopup}
                id={brandId}
                nameDT={nameDT}
                descriptionDT={descriptionDT}
                operatingStatusDT={operatingStatusDT}
            />

            <BrandStatus
                isOpen={isModalOpenStatus}
                onClose={handleCloseUpdateStatus}
                id={brandId}
                operatingStatusDTST={operatingStatusDTST}
            />
        </>
    );
}
