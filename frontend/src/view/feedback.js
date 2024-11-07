import { useEffect, useState } from "react";
import { Feedback } from "../apiServices";
import { useSelector } from "react-redux";

const FeedbackDetail = ({id, updateFeedbackCount }) => {

    const [inputValue, setInputValue] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [dataFeedback, setDataFeedback] = useState(null);
    const { token } = useSelector(state => state.user);
    const user = useSelector(state => state.user.firstName);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleSubmit = () => {
        const dataCreate = {
            IdShirt: parseInt(id),
            UserName: user,
            Description: inputValue
        };
        fetchCreate(dataCreate);
    };

    const commentCount = dataFeedback ? dataFeedback.length : 0;
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const fetchCreate = async (dataCreate) => {
        try {
            await Feedback.post(dataCreate, token);
            setSuccessMessage('Feedback sent successfully!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 500);
            setInputValue('');
            fetchProduct();
        } catch (error) {
        }
    };

    const fetchProduct = async () => {
        try {
            const response = await Feedback.get(parseInt(id), token);
            setDataFeedback(response?.data);
            updateFeedbackCount(response.data.length);
        } catch (error) {
            console.error('Error fetching product detail:', error);
            // setIsLoading(isLoading);
        }
    };
    

    return (
        <div className='feedback'>
            <div style={{ width: '70%', marginLeft: '15%' }}>
                <div className="box-container" >
                    <h3>Feedback</h3>

                    <div className="container-product" style={{ width: "100%" }}>
                        <textarea type="text" className="input-product" placeholder="Enter here......" value={inputValue} onChange={handleChange}></textarea>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: '1%' }}>

                            <button className="send-button" onClick={handleSubmit}>Send feedback</button>
                            {successMessage && <div className="success-message-send">{successMessage}</div>}
                        </div>
                    </div>

                </div>

                <div className="box-container" style={{ marginTop: "3%" }}>
                    <h3>Product reviews ({commentCount})</h3>

                    <div>
                        {dataFeedback?.map((comment, index) => (
                            <div className="comment" key={index}>
                                <div className="user-info">
                                    <div className="user-avatar"></div>
                                    <div style={{ width: "30%" }}>
                                        <div>
                                            <span className="user-name">{comment?.userName}</span>
                                        </div>
                                        <div className="rating">
                                            {/* <span className="stars">★★★★☆</span> */}
                                            <span className="date">{comment?.createDate}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-content">
                                    <div className="description">{comment?.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};
export default FeedbackDetail;