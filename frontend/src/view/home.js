import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shirt } from '../apiServices';
import { useSelector } from 'react-redux';

export default function Home() {
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { token } = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState("");

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

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <div>Loading...</div>
            </div>
        );
    }

    const handleItemClick = (index) => {
        setSelectedItem(index);
        if (index === 0) {
            document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
        } else if (index === 1) {
            document.getElementById('product').scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleCart = () => {
        navigate(`/product/cart`);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        fetchData(searchTerm);
        const productSection = document.getElementById("product");
        productSection.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <div className="header_1">
                <div className="header">
                    <div className="logo-container" onClick={() => window.location.href = "http://localhost:3000/product"}>
                        <img className="logo" src="https://img.freepik.com/premium-vector/tshirt-logo-clothing-logo-apparel-store-icon-fashion-logo-design-tshirt-icon-template_657888-112.jpg" alt="Shirt Store Logo" />
                        <span className="store-name">Shirt Store</span>
                    </div>
                    <div className="menu">
                        <ul>
                            <li className={selectedItem === 0 ? 'selected' : ''} onClick={() => handleItemClick(0)}><a href="#home">Home</a></li>
                            <li className={selectedItem === 1 ? 'selected' : ''} onClick={() => handleItemClick(1)}><a href="#product">Product</a></li>
                        </ul>
                    </div>
                    <div className="cart1">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                            className="search-input-home"
                        />
                        <FontAwesomeIcon icon={faSearch} className="search-icon-home" onClick={handleSearch} />
                    </div>


                    <div className="cart">
                        <FontAwesomeIcon icon={faShoppingCart} className="search-icon" onClick={() => handleCart()} />
                    </div>

                    <div className="cart">
                        <FontAwesomeIcon icon={faUser} className="search-icon" />
                    </div>
                </div>
            </div>

            <div className="home" id="home">
                <div className='image'>
                    <img className="image_home" src={require("../image/home/1.png")} alt="Shirt Store Logo" />
                </div>

                <div className="image-child">
                    <div className="image_child">
                        <img className="image_one" src={require("../image/home/2.png")} alt="Shirt Store Logo" />
                    </div>
                    <div className="image_child2">
                        <img className="image_two" src={require("../image/home/3.png")} alt="Shirt Store Logo" />
                    </div>
                    <div className="image_child2">
                        <img className="image_two" src={require("../image/home/8.png")} alt="Shirt Store Logo" />
                    </div>
                </div>
            </div>
            <div className="product" id="product">
                <div className='title-product'>
                    Featured Products
                </div>
                <div className="image-product-container">
                    {data?.map((image, index) => (
                        <div className="image-product" key={index}>
                            <a className="product-link" onClick={() => handleProductClick(image?.item1?.id)}>
                                <img className="product-image" src={Shirt.BASEURLIMAGE + image?.item2[0]?.imgPath} alt={image?.item1?.name} />
                                <p className="name" title={image?.item1?.name}>{image?.item1?.name}</p>
                                <p className="price"><b>Price:</b> ${image?.item1?.price}</p>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
