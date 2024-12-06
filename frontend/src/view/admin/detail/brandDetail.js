
import { faL, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Brand } from "../../../apiServices/brand";

export default function BrandDetail({ isOpen, onClose, id, nameDT, descriptionDT, operatingStatusDT }) {

    const [operatingStatus, setOperatingStatus] = useState(1);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useSelector(state => state.user);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!isNaN(id) && id !== 0) {
            setIsEditing(true);
            setName(nameDT);
            setDescription(descriptionDT);
            setOperatingStatus(operatingStatusDT);
        } else {
            setIsEditing(false);
            setName('');
            setDescription('');
            setOperatingStatus(1);
        }
    }, [id]);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const params = {
                Name: name,
                Description: description,
                OperatingStatus: operatingStatus,
                UpdatedDate: new Date()
            };

            if (isEditing) {
                await Brand.updateBrand(token, id, params);
            } else if (!isEditing) {
                params.CreatedDate = new Date();
                await Brand.createBrand(token, params);
            }
            setIsLoading(false);
            onClose();
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    }

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
                        {isEditing == true ? 'Edit brand' : 'Add new brand'}
                    </div>
                    <div style={{ width: '15%' }}>
                        <button className="close-button" style={{ background: 'none', width: '30px', height: '30px', borderRadius: '50%' }} onClick={onClose}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>

                <div style={{ margin: "1%" }}>
                    <div style={{ width: '100%', display: 'flex', gap: '1%' }}>
                        <input name="Name" placeholder='Brand name' value={name} className='input-purchase' onChange={(e) => setName(e.target.value)} />
                        <select
                            value={operatingStatus}
                            style={{
                                width: "100%",
                                padding: "0.5rem 2rem 0.5rem 0.5rem",
                                boxSizing: "border-box",
                                border: "1px solid #ccc",
                                borderRadius: "0.5rem",
                                height: '46px'
                            }}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                setOperatingStatus(value);
                            }}
                        >
                            <option value="1">Active</option>
                            <option value="2">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <textarea name="description" placeholder='Description' className='input-purchase' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
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
}