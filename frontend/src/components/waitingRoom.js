import { faMessage, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { User } from "../apiServices";

const WaitingRoom = ({ joinChatRoom }) => {

    const [chatroom, setChatroom] = useState();
    const user = useSelector(state => state.user.firstName);
    const userId = useSelector(state => state.user.id);
    const role = useSelector(state => state.user.role);
    const [data, setData] = useState(null);
    const { token } = useSelector(state => state.user);

    useEffect(() => {
        fetchData();
    }, []);

    const handleAdminClick = (value) => {
        console.log("value: ", value);

        setChatroom(value);
        joinChatRoom(user, value);
    };

    const fetchData = async () => {
        // setIsLoading(true);
        try {
            const response = await User.getAllUser(token);
            setData(response.data);
            // setIsLoading(false);
        } catch (error) {
            // setError(error);
            // setIsLoading(false);
        }
    };
    return <Form onSubmit={e => {
        e.preventDefault();
        joinChatRoom(user, chatroom);
    }}>
        <Row className="" style={{ cursor: 'pointer' }}>
            {role === 0 && (
                <div onClick={() => handleAdminClick("admin" + userId)} className="message-home">
                    <div className="message-home-icon"><FontAwesomeIcon icon={faMessage} /></div>
                    <div className="message-home-title">
                        Salesman
                    </div>
                </div>
            )}
            {role === 1 && (
                data?.filter((item) => item.role === 0)?.map((item) => (
                    <div onClick={() => handleAdminClick("admin" + item.id)} className="message-home">
                        <div className="message-home-icon"><FontAwesomeIcon icon={faMessage} /></div>
                        <div className="message-home-title">
                            {item.firstName}
                        </div>
                    </div>
                ))
            )}
            <div onClick={() => handleAdminClick("userCommunity")} className="message-home">
                <div className="message-home-icon"><FontAwesomeIcon icon={faMessage} /></div>
                <div className="message-home-title">
                    User community
                </div>
            </div>
        </Row>
    </Form>
}

export default WaitingRoom;