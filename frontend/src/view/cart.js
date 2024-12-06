import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CartApi } from '../apiServices/cart';
import Footer from './footer';
import Header from './header';
import Partner from './partner';

export default function Cart() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const userId = useSelector(state => state.user.id);
    const { token } = useSelector(state => state.user);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [selectedTotal, setSelectedTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCarts();
    }, []);

    const fetchCarts = async () => {
        setIsLoading(true);
        try {
            const response = await CartApi.getCartByUserId(token, userId);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    const fetchDeleteCart = async (id) => {
        setIsLoading(true);
        try {
            await CartApi.deleteItemFromCart(token, userId, id);
            fetchCarts();
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    const fetchUpdateCart = async (cartId, quantity) => {
        setIsLoading(true);
        try {
            await CartApi.updateCart(token, cartId, quantity);
            fetchCarts();
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    console.log(data);

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedItems([]);
            setIsAllSelected(false);
            setSelectedTotal(0);
        } else {
            setSelectedItems(data.items.map((item) => item.id));
            setIsAllSelected(true);
            const total = data.items.reduce((sum, item) => sum + item.total, 0);
            setSelectedTotal(total);
        }
    };

    const handleRemoveItem = (id) => {
        fetchDeleteCart(id);
    }

    const handleSelectItem = (id) => {
        let newSelectedItems;
        if (selectedItems.includes(id)) {
            newSelectedItems = selectedItems.filter((itemId) => itemId !== id);
            setIsAllSelected(false);
        } else {
            newSelectedItems = [...selectedItems, id];
        }

        setSelectedItems(newSelectedItems);

        if (newSelectedItems.length === data.items.length) {
            setIsAllSelected(true);
        }

        const total = newSelectedItems.reduce((sum, itemId) => {
            const item = data.items.find(item => item.id === itemId);
            return item ? sum + item.total : sum;
        }, 0);
        setSelectedTotal(total);
    };

    const handleQuantityChange = (id, newQuantity) => {
        const updatedItems = data.items.map(item =>
            item.id === id
                ? {
                    ...item,
                    quantity: newQuantity,
                    total: item?.shirt?.price * newQuantity
                }
                : item
        );
        setData({ ...data, items: updatedItems });
        console.log(updatedItems);


        const selectedTotal = selectedItems.reduce((sum, selectedId) => {
            const selectedItem = updatedItems.find(item => item.id === selectedId);
            return selectedItem ? sum + selectedItem.total : sum;
        }, 0);
        setSelectedTotal(selectedTotal);
    };

    const handleEdit = (id, currentQuantity) => {
        fetchUpdateCart(id, currentQuantity);
    };

    const handleProductPayment = () => {
        const selectedData = data.items.filter(item => selectedItems.includes(item.id));
        navigate("/product/purchase", { state: { selectedItems: selectedData } });
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
            <div style={{ width: '70%', marginLeft: '15%' }}>
                <div className="breadcrumb">
                    <Link to="/home" className="breadcrumb-item-hover">Home</Link>
                    <span className="breadcrumb-divider">/</span>
                    <span className="breadcrumb-item">Carts</span>
                </div >
            </div>
            <div style={{ width: '70%', marginLeft: '15%', fontSize: '25px', color: 'rgb(131, 68, 83)' }}>Carts</div>
            <div style={{ width: '70%', margin: '2% 0 2% 15%' }} className='cart11'>
                <table className="cart-table1">
                    <thead>
                        <tr>
                            <th>
                                <Checkbox
                                    checked={isAllSelected}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>Product Name</th>
                            <th>Color</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total amount</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.items && data.items.length > 0 ? (
                            data.items.map((item) => (
                                <tr key={item?.shirt?.id}>
                                    <td>
                                        <Checkbox
                                            checked={selectedItems.includes(item.id)}
                                            onChange={() => handleSelectItem(item.id)}
                                        />
                                    </td>
                                    <td className="product-name">{item?.shirt?.name}</td>
                                    <td className="price">{item?.color}</td>
                                    <td className="price">{item?.shirt?.price}</td>
                                    <td className="quantity">
                                        <input type="number"
                                            min="0"
                                            value={item?.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                        />
                                    </td>
                                    <td className="total-price">{item?.shirt?.price * item?.quantity}</td>
                                    <td className="remove-btn"><FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(item?.id, item?.quantity)} /></td>
                                    <td className="remove-btn"><FontAwesomeIcon icon={faRemove} onClick={() => handleRemoveItem(item?.id)} /></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center' }}>No products available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                    <h2>Totals:</h2>
                    <input type="text" value={selectedTotal} readOnly style={{ borderRadius: '10px', textAlign: 'center' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px' }}>
                    <button className="btn btn-primary"
                        onClick={() => handleProductPayment()}
                        disabled={selectedItems.length === 0}
                    >Product payment</button>
                </div>
            </div>
            <Partner />
            <Footer />
        </>
    )
}