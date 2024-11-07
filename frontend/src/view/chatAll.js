import { faMessage, faMinus, faPhone, faPhoneVolume, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useState } from "react";
import ChatRoomClass from "../components/ChatRoom";
import WaitingRoom from "../components/waitingRoom";

export default function ChatAll() {

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [conn, setConn] = useState();
    const [messages, setMessages] = useState([]);
    const [isMinimized, setIsMinimized] = useState(false);
    const [showPhone, setShowPhone] = useState(false);

    const togglePopup = () => {
        setIsOpen(prev => {
            const newState = !prev;
            if (newState) {
                setIsMinimized(false);
            }
            return newState;
        });
    };

    const handleIconClick = () => {
        setShowPhone(!showPhone);
    };


    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    const handleConfirmation = () => {
        setShowConfirmation(!showConfirmation);
    };

    const joinChatRoom = async (username, chatroom) => {
        console.log("username: ", username);

        try {
            const conn = new HubConnectionBuilder()
                .withUrl("https://localhost:7172/chatHub")
                .configureLogging(LogLevel.Information)
                .build();
            conn.on("JoinSpecificChatRoom", (username, msg) => {
                console.log("msg: ", msg);
            })
            conn.on("ReceiveSpecificMessage", (username, msg) => {
                setMessages(messages => [...messages, { username, msg }])
                console.log("test: ", msg);
            })
            await conn.start();
            await conn.invoke("JoinSpecificChatRoom", { username, chatroom });
            setConn(conn);
        } catch (error) {
            console.log(error);
        }
    }

    const sendMessage = async (messages) => {
        try {
            await conn.invoke("SendMessage", messages);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {isOpen && (
                <div className={`chat-popup ${isMinimized ? 'minimized' : ''}`}>
                    <div className="chat-header">
                        <span>Chat</span>
                        <div onClick={toggleMinimize}>
                            <FontAwesomeIcon
                                icon={isMinimized ? faPlus : faMinus}
                                className="minimize-btn"
                            />
                            <button onClick={togglePopup} className="close-btn">X</button>
                        </div>
                    </div>
                    {!isMinimized && (
                        <div className="chat-body">
                            {!conn ? (
                                <WaitingRoom joinChatRoom={joinChatRoom} />
                            ) : (
                                <ChatRoomClass messages={messages} sendMessage={sendMessage} />
                            )}
                        </div>
                    )}
                </div>
            )}

            {!isOpen && showConfirmation && (
                <div>
                    <div className="fix-right-phone" onClick={handleIconClick} style={{ display: '-webkit-box' }}>
                        {showPhone && (
                            <a href="tel:0985538080" style={{ textDecoration: 'none', color: 'black', marginRight:'5px'}}>
                                <span className="text">
                                    0985538080
                                </span>
                            </a>
                        )}
                        <div>
                            <FontAwesomeIcon
                                icon={faPhone}
                                color="#ffffff"
                            />
                        </div>
                    </div>
                    <div className="fix-right-1" onClick={togglePopup}>
                        <FontAwesomeIcon icon={faMessage} color="#ffffff" />
                    </div>
                </div>
            )}

            {!isOpen && (
                <div className="fix-right" onClick={() => setShowConfirmation(!showConfirmation)}>
                    <FontAwesomeIcon icon={faPhoneVolume} color="#ffffff" />
                </div>
            )}
        </>
    )
}