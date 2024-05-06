import React, { useEffect, useRef, useState } from 'react';
import { Shirt } from '../apiServices';
import img from '../image/home/1.jpg'
import { useSelector } from 'react-redux';

export default function View({ onClose, id }) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { token } = useSelector(state => state.user);

    useEffect(() => {
        fetchProductDetail();
    }, []); 

    const fetchProductDetail = async () => {
        try {
            const response = await Shirt.getById(id, token);
            setData(response?.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        };
    }

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
            <div className="popup-create">
                <div className="title-create">View<span className="close-icon" onClick={onClose}>x</span></div>
                <div className="main-create" style={{ borderBottom: 'none', display: 'block' }}>
                    <div style={{ display: 'flex', marginBottom: '3%' }}>
                        <div className="container-product" style={{ width: "50%" }}>

                            <div className="cart1" style={{ display: 'block' }}>
                                <div style={{ marginBottom: '1%' }}>Product name</div>
                                <input
                                    type="text"
                                    placeholder="Please enter information..."
                                    className="search-input-product"
                                    disabled
                                    value={data?.item1?.name}
                                />
                            </div>
                        </div>
                        <div className="container-product" style={{ width: "50%" }}>

                            <div className="cart1" style={{ display: 'block' }}>
                                <div style={{ marginBottom: '1%' }}>Price</div>
                                <input
                                    type="text"
                                    placeholder="Please enter information..."
                                    className="search-input-product"
                                    disabled
                                    value={data?.item1?.price}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="view-image-container">
                        <div style={{ marginBottom: '1%' }}>Image:</div>
                        <div className="image-row">
                            {Array.isArray(data?.item2) && data?.item2.map((item, index) => (
                                <img
                                    key={index}
                                    className="view-image"
                                    src={Shirt.BASEURLIMAGE + item?.imgPath}
                                    alt={`Image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}