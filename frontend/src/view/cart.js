import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, productCheck, productCheckFilter, searchCart, searchCartStart } from '../store/actions/cart';
import {  useNavigate } from 'react-router-dom';

export default function Cart() {
    const [isLoading, setIsLoading] = useState(true);
    const [listChecked, setListChecked] = useState([]);
    const [search, setSearch] = useState(false);
    const [keySearch, setKeySerch] = useState("");
    const { products } = useSelector(state => state.cart)
    const { productSearch } = useSelector(state => state.cart)
    const { productChecked } = useSelector(state => state.cart)
    const [checkedCount, setCheckedCount] = useState(0);
    const [checkedTotal, setCheckedTotal] = useState(0);
    const dispatch = useDispatch()
    const [newItem, setNewItem] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(!isLoading);
        }, 500);
    }, []);

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <div>Loading...</div>
            </div>
        );
    }

    const handleCheckboxChange = (e) => {
        const newValue = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            const selectedItem = search ? productSearch.find(product => product.cartId === newValue) : products.find(product => product.cartId === newValue);
            if (!newItem.some(item => item.cartId === selectedItem.cartId)) {
                setNewItem(prevItems => [...prevItems, selectedItem]);
            }
            setListChecked(prevListChecked => {
                const updatedList = [...prevListChecked, newValue];
                dispatch(productCheck(updatedList));
                setCheckedCount(prevCount => prevCount + 1);
                updateCheckedTotal(updatedList);
                return updatedList;
            });
        } else {
            setNewItem(prevItems => prevItems.filter(item => item.cartId !== newValue));
            setListChecked(prevListChecked => {
                const updatedList = prevListChecked.filter(item => item !== newValue);
                dispatch(productCheck(updatedList));
                setCheckedCount(prevCount => prevCount - 1);
                updateCheckedTotal(updatedList);
                return updatedList;
            });
        }
    };

    const handlePurchase = () => {
        if (!listChecked) {
            alert('Please select item before purchase.');
            return;
        }
        navigate('/product/purchase', { state: { newItem } });
    };

    const updateCheckedTotal = (checkedItems) => {
        let total = 0;
        checkedItems.forEach(itemId => {
            const checkedProduct = products.find(product => product.cartId === itemId);
            if (checkedProduct) {
                total += checkedProduct.total;
            }
        });
        setCheckedTotal(total);
    };


    const openConfirmation = (productId) => {
        const confirmed = window.confirm("Are you sure you want to remove this product from your cart?");
        if (confirmed) {
            dispatch(deleteCart(productId));
        } else {

        }
    };

    const handleSearch = () => {
        dispatch(searchCartStart())
        dispatch(searchCart(keySearch))
        setSearch(true)
    };

    const handelSearchChange = (e) => {
        setKeySerch(e.target.value)
    };

    return (
        <>
            <div className="header_1">
                <div className="header" style={{ padding: '25px 0', width: '80% !important', flexDirection: 'row', justifyContent: 'center' }}>
                    <div className="logo-container" onClick={() => window.location.href = "http://localhost:3000/product"} style={{ width: '50%' }}>
                        <div style={{ borderRight: '1px solid #ccc', paddingRight: '2%' }}>
                            <img className="logo" src="https://img.freepik.com/premium-vector/tshirt-logo-clothing-logo-apparel-store-icon-fashion-logo-design-tshirt-icon-template_657888-112.jpg" alt="Shirt Store Logo" />
                            <span className="store-name">Shirt Store</span>
                        </div>
                        <div style={{ paddingLeft: '10%', fontSize: '30px' }}>
                            <div>CART</div>
                        </div>
                    </div>

                    <div className="search-container" onClick={() => handleSearch()} >
                        <input type="text" placeholder="Search product..." className="search-input" onChange={(e) => handelSearchChange(e)} />
                        <button className="search-button">
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="cart-table">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!search ? products.map(product => (
                            <tr key={product?.id}>
                                <td><input type="checkbox" value={product?.cartId} onChange={(e) => handleCheckboxChange(e)} /></td>
                                <td>
                                    <div className="product-info">
                                        <span>{product?.name}</span>
                                    </div>
                                </td>
                                <td>{product?.color}</td>
                                <td>{product?.size}</td>
                                <td>{product?.price}</td>
                                <td>{product?.quantity}</td>
                                <td>{product?.total}</td>
                                <td> <button onClick={() => openConfirmation(product?.cartId)}>Delete</button></td>
                            </tr>
                        )) :
                            productSearch.map(product => (
                                <tr key={product?.id}>
                                    <td><input type="checkbox" checked={product?.checked} value={product?.cartId} onChange={(e) => handleCheckboxChange(e)} /></td>
                                    <td>
                                        <div className="product-info">
                                            <span>{product?.name}</span>
                                        </div>
                                    </td>
                                    <td>{product?.color}</td>
                                    <td>{product?.size}</td>
                                    <td>{product?.price}</td>
                                    <td>{product?.quantity}</td>
                                    <td>{product?.total}</td>
                                    <td> <button onClick={() => openConfirmation(product?.cartId)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="footer">
                <div style={{ display: 'flex' }} className='footer-content'>
                    <div>
                        <span>Number of products selected ({checkedCount})</span>
                    </div>
                    <div style={{ paddingRight: '5%' }}>
                        Total money payable: ${checkedTotal}
                    </div>
                    <button onClick={handlePurchase} >Purchase</button>
                </div>
            </div>


        </>
    )
}