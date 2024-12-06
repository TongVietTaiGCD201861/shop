import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import { Discount } from '../../../apiServices/discountApiEndPoint';
import { useSelector } from 'react-redux';

const DiscountDetail = ({ isOpen, onClose, id }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [expiryDate, setExpiryDate] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [valueReduced, setValueReduced] = useState('');
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const { token } = useSelector(state => state.user);

    useEffect(() => {
        if (!isNaN(id) && id !== 0) {
            setIsEditing(true);
            fetchData();
            // set data
        } else {
            setIsEditing(false);
        }
    }, [id]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await Discount.getById(token, id);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    }

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const data = {
                ValueReduced: valueReduced,
                Name: name,
                Description: description,
                Code: code,
                ExpiryDate: expiryDate,
            };

            if (isEditing) {
                data.Id = id;
                await Discount.updateDiscount(token, data);
            } else if (!isEditing) {
                data.UpdatedDate = new Date()
                data.CreatedDate = new Date();
                await Discount.createDiscount(token, data);
            }
            setIsLoading(false);
            onClose();
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    return isOpen ? (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        }}>
            <div style={{
                backgroundColor: 'white',
                width: '800px',
                textAlign: 'center',
            }}>
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        background: '#944b44',
                        color: 'white',
                        alignItems: 'center'
                    }}>
                    <div
                        style={{
                            width: '85%',
                            textAlign: 'start',
                            padding: '1%',
                        }}>
                        {isEditing == true ? 'Edit discount' : 'Add new discount'}
                    </div>
                    <div style={{ width: '15%' }}>
                        <button className="close-button" style={{ background: 'none', width: '30px', height: '30px', borderRadius: '50%' }} onClick={onClose}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>
                <div style={{ margin: "1%" }}>
                    <div style={{ width: '100%', display: 'flex', gap: '1%' }}>
                        <input name="Name" placeholder='Discount name' value={name} className='input-purchase' onChange={(e) => setName(e.target.value)} />
                        <div style={{ position: "relative", width: '100%' }}>
                            <DatePicker
                                style={{
                                    width: "100%",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    padding: '0.62rem',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="Expiry Date"
                                value={expiryDate}
                                onChange={(date) => setExpiryDate(date)}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ margin: "1%" }}>
                    <div style={{ width: '100%', display: 'flex', gap: '1%' }}>
                        <input name="Code" placeholder='Code' value={code} className='input-purchase' onChange={(e) => setCode(e.target.value)} />
                        <input name="valueReduced" placeholder='Reduced' value={valueReduced} className='input-purchase' onChange={(e) => setValueReduced(e.target.value)} />
                    </div>
                </div>

                <div style={{ margin: "1%" }}>
                    <textarea name="Description" placeholder='Description' value={description} className='input-purchase' onChange={(e) => setDescription(e.target.value)} ></textarea>
                </div>
                <div>
                    <button
                        type="button"
                        style={{
                            backgroundColor: '#944b44',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            marginRight: '0.5rem',
                            marginBottom: '0.5rem',
                        }}
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: 'green',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                        }}
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default DiscountDetail;