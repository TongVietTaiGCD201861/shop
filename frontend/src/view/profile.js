import { faPlus, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../apiServices';
import { useSelector } from 'react-redux';

export default function Profile() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useSelector(state => state.user);
    const id = useSelector(state => state.user.id);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isMale, setIsMale] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await User.getById(id, token);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        // return (
        //     <div className="loading-container">
        //         <div className="loading-spinner"></div>
        //         <div>Loading...</div>
        //     </div>
        // );
    }
    const handleCheckboxChange = (event) => {
        setIsMale(event.target.checked);
    };

    const handleCart = () => {
        navigate(`/product/cart`);
    };
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onload = () => {
            setImageUrl(fileReader.result);
        };
    };

    const handleDelete = () => {
        setSelectedFile(null);
        setImageUrl(null);
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        <>
            <div className="header_1">
                <div className="header">
                    <div className="logo-container" onClick={() => window.location.href = "http://localhost:3000/product"} style={{ width: '90%' }}>
                        <img className="logo" src="https://img.freepik.com/premium-vector/tshirt-logo-clothing-logo-apparel-store-icon-fashion-logo-design-tshirt-icon-template_657888-112.jpg" alt="Shirt Store Logo" />
                        <span className="store-name">Shirt Store</span>
                    </div>
                    <div className="cart">
                        <FontAwesomeIcon icon={faShoppingCart} className="search-icon" onClick={() => handleCart()} />
                    </div>
                </div>
            </div>
            <div className="breadcrumb">
                <Link to="/product" className="breadcrumb-item-hover">Product</Link>
                <span className="breadcrumb-divider">/</span>
                <span className="breadcrumb-item">My profile</span>
            </div>
            <div className="profile">
                <div style={{ padding: '1% 4%', borderBottom: '1px solid #ccc' }}>
                    <div className="profile-title" style={{ fontSize: '32px' }}>MY PROFILE</div>
                    <div className="profile-title">Manage profile information for account security</div>
                </div>
                <div style={{ padding: '4% 2%', display: 'flex', width: '100%' }}>
                    <div style={{ width: '70%', borderRight: '1px solid #ccc' }}>
                        <div className='data-profile'>
                            <div className='data-profile-title'>
                                Email Login:
                            </div>
                            <div className='data'>
                                {data?.email}
                            </div>
                        </div>
                        <div className='data-profile'>
                            <div className='data-profile-title'>
                                FirstName:
                            </div>
                            <div className='data'>
                                {data?.firstName}
                            </div>
                        </div>
                        <div className='data-profile'>
                            <div className='data-profile-title'>
                                LastName:
                            </div>
                            <div className='data'>
                                {data?.lastName}
                            </div>
                        </div>
                        <div className='data-profile'>
                            <div className='data-profile-title'>
                                Sex:
                            </div>
                            <div className='data'>
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={isMale}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span className="custom-checkbox"></span>
                                    Nam
                                </label>
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={!isMale}
                                        onChange={(event) => setIsMale(!event.target.checked)}
                                    />
                                    <span className="custom-checkbox"></span>
                                    Nữ
                                </label>
                            </div>
                        </div>
                        {/* <button type="submit" style={{ marginTop: "5%" }} >Save</button> */}
                    </div>
                    <div style={{ width: '30%' }}>
                        {!imageUrl && (<div className='profile-image'>
                            <div className="cart-profile"  >
                                <FontAwesomeIcon icon={faUser} style={{width:'80px',height:'80px'}} />
                            </div>
                        </div>)}
                        {imageUrl && (<div className='profile-image'>
                            <img className='profile-img'
                                src={imageUrl} alt='Selected' />
                                <button className="delete-button" onClick={handleDelete}>X</button>
                        </div>)}

                        <div style={{ width: '100%' }}>
                            <div style={{ width: '80%', marginLeft: '10%', marginTop: '3%' }}>
                                <button className='btn-add' onClick={() => document.getElementById('fileInput').click()}><FontAwesomeIcon icon={faPlus} /> Select image </button>
                                <input id="fileInput" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer style={{ position: "fixed", bottom: '0', left: '0', right: '0' }}>
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
    );
}