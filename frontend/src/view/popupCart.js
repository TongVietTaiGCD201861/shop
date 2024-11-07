import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Shirt } from "../apiServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faTimes } from "@fortawesome/free-solid-svg-icons";

const PopupCart = ({ productId, onClose }) => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useSelector(state => state.user);

    useEffect(() => {
        fetchProductDetail();
    }, [productId]);


    const fetchProductDetail = async () => {
        try {
            setIsLoading(true);
            const response = await Shirt.getById(productId, token);
            setData(response?.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching product detail:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="popup-product">
            <div className="popup-content-product">
                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ width: '90%' }}>Sản phầm <b>{data?.item1?.name}</b></div>
                    <button className="close-button" style={{ padding: '1px', background: 'none', width: '30px', height: '30px', borderRadius: '50%' }} onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <div style={{ borderBottom: '1px solid #ccc', paddingTop: '2%' }}></div>
                <div style={{ display: 'flex', width: '100%', marginTop: '5%' }}>
                    <div style={{ width: '70%', display: 'flex' }}>
                        <div style={{ width: '25%' }}>
                            {/* <img className="product-image" src={Shirt.BASEURLIMAGE + item?.item2[0]?.imgPath} alt={item?.item1?.name} /> */}
                            <img
                                className="product-image-home-popup"
                                src={require('../image/home/462287097_1101780851957342_5037346083786431034_n.jpg')}
                                alt={data?.item1?.name}
                            /></div>
                        <div style={{ width: '75%', color: 'black', fontWeight: '500' }}>{data?.item1?.name}</div>
                    </div>
                    <div style={{ width: '30%' }}>
                        <div>${data?.item1?.price}</div>
                        <div style={{ border: '1px solid #ccc', padding: '2%', width: '20px', marginTop: '10%', borderRadius: '5px' }}>1</div>
                    </div>
                </div>
                <div style={{ borderBottom: '1px solid #ccc', paddingTop: '2%', marginBottom: '2%' }}></div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: '25%', right: '10px' }}>
                        <button className='btn-signup'><FontAwesomeIcon icon={faShoppingBasket} /> Purchase</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupCart;