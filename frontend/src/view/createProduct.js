import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { Shirt } from "../apiServices";
import { useSelector } from "react-redux";

export default function CreateProduct({ onClose, id, action }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { token } = useSelector(state => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    if (action === "update") {
        useEffect(() => {
            fetchProductDetail();
        }, []);
    }

    const fetchProductDetail = async () => {
        try {
            const response = await Shirt.getById(id, token);
            setData(response?.data);
            setName(response?.data?.item1?.name || '');
            setPrice(response?.data?.item1?.price || '');
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        };
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onload = () => {
            setImageUrl(fileReader.result);
        };
    };

    const handleUpload = (id) => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            fetchUploadFile(id, formData)
        } else {
            alert('Please select a file to upload.');
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

    const handleDelete = () => {
        setSelectedFile(null);
        setImageUrl(null);
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }


    const handleCreate = () => {
        if (action === "create") {
            create();
        } else if (action === "update") {
            update();
        }
    }

    const create = () => {
        if (!name || !price) {
            alert("Please enter product name and price.");
            return;
        }
        const { value } = event.target;
        if (!isNaN(value)) {
            setPrice(value);
        }

        const currentDate = new Date();
        const year = getCurrentYear(currentDate);
        const month = getCurrentMonth(currentDate);
        const day = getCurrentDay(currentDate);
        const hours = getCurrentHours(currentDate);
        const minutes = getCurrentMinutes(currentDate);
        const seconds = getCurrentSeconds(currentDate);

        const id = generateUniqueId(hours, minutes, seconds);
        const createDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const createProduct = {
            Id: parseInt(id),
            Name: name,
            Brand: "Shirts",
            createdDate: createDate,
            Sex: true,
            Price: parseInt(price),
        };
        handleUpload(parseInt(id));
        fetchData({ ...createProduct });
    }

    const update = () => {

        if (!name || !price) {
            alert("Please enter product name and price.");
            return;
        }

        const createProduct = {
            Id: parseInt(id),
            Name: name,
            Price: parseInt(price),
            createdDate: data?.item1?.createdDate,
            Sex: data?.item1?.sex,
            Brand: data?.item1?.brand,
        };
        fetchData({ ...createProduct });
    }


    const fetchUploadFile = async (id, formData) => {
        try {
            await Shirt.uploadFile(id, formData, token);
            // setSuccessMessage('Successful upload image!');
            // if (successMessage) {
            onClose()
            // }
        } catch (error) {
        }
    };

    const fetchData = async (createProduct) => {
        try {
            if (action === "create") {
                await Shirt.post(createProduct, token);
            } else if (action === "update") {
                await Shirt.put(id, createProduct, token);
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCurrentYear = (date) => {
        return date.getFullYear();
    }

    const getCurrentMonth = (date) => {
        return (date.getMonth() + 1).toString().padStart(2, '0');
    }

    const getCurrentDay = (date) => {
        return date.getDate().toString().padStart(2, '0');
    }

    const getCurrentHours = (date) => {
        return date.getHours().toString().padStart(2, '0');
    }

    const getCurrentMinutes = (date) => {
        return date.getMinutes().toString().padStart(2, '0');
    }

    const getCurrentSeconds = (date) => {
        return date.getSeconds().toString().padStart(2, '0');
    }

    const generateUniqueId = (year, month, day, hours, minutes, seconds) => {
        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }


    return (
        <>
            <div className="popup-create">
                <div className="title-create">{action === "create" ? "Create product" : "Update product"}  <span className="close-icon" onClick={onClose}>x</span></div>
                {action === "create" && (
                    <div className="main-create" style={{ display: 'block' }}>
                        <div style={{ display: 'flex', width: '100%' }}>

                            <div className="container-product" style={{ width: "50%" }}>
                                <div style={{ marginBottom: '1%' }}>Product name</div>
                                <div className="cart1">
                                    <input
                                        type="text"
                                        placeholder="Please enter information..."
                                        className="search-input-product"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                </div>
                            </div>
                            <div className="container-product" style={{ width: "50%" }}>
                                <div style={{ marginBottom: '1%' }}>Price</div>
                                <div className="cart1">
                                    <input
                                        type="number"
                                        placeholder="Please enter information..."
                                        className="search-input-product"
                                        value={price}
                                        onChange={handlePriceChange}
                                    />
                                </div>
                            </div>

                        </div>

                        <div>
                            <div style={{ marginBottom: '1%' }}>Image</div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {!imageUrl && (
                                    <div className="create-image" style={{ border: '2px solid #ccc', borderRadius: '10px', padding: '10px', cursor: 'pointer' }} onClick={() => document.getElementById('fileInput').click()}>
                                        <div class="center">
                                            <div>
                                                <FontAwesomeIcon icon={faCloudUpload} />
                                            </div>
                                            <div>
                                                Vui lòng click vào đây để upload file
                                            </div>
                                        </div>

                                        <div >
                                            <input id="fileInput" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                                        </div>
                                    </div>
                                )}

                                <div className="image-container">
                                    {imageUrl && (
                                        <div className="image-preview">
                                            <img src={imageUrl} alt="Selected" />
                                            <button className="delete-button" onClick={handleDelete}>X</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {action === "update" && (
                    <div className="main-create" style={{ display: 'block' }}>
                        <div style={{ display: 'flex', width: '100%' }}>

                            <div className="container-product" style={{ width: "50%" }}>
                                <div style={{ marginBottom: '1%' }}>Product name</div>
                                <div className="cart1">
                                    <input
                                        type="text"
                                        placeholder="Please enter information..."
                                        className="search-input-product"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                </div>
                            </div>
                            <div className="container-product" style={{ width: "50%" }}>
                                <div style={{ marginBottom: '1%' }}>Price</div>
                                <div className="cart1">
                                    <input
                                        type="number"
                                        placeholder="Please enter information..."
                                        className="search-input-product"
                                        value={price}
                                        onChange={handlePriceChange}
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
                )}

                <div style={{ marginTop: '3%', display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={handleCreate} style={{ marginRight: '1%' }}>Confirm</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </>
    )
}