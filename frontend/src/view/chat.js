import { useState } from "react";
import WaitingRoom from "../components/waitingRoom";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoomClass from "../components/ChatRoom";

function Chat() {

    const [conn, setConn] = useState();
    const [messages, setMessages] = useState([]);

    const joinChatRoom = async (username, chatroom) => {
        try {
            const conn = new HubConnectionBuilder()
                .withUrl("https://localhost:7172/chatHub")
                .configureLogging(LogLevel.Information)
                .build();

            conn.on("JoinSpecificChatRoom", (username, msg) => {
                setMessages(messages => [...messages, { username, msg }])
            })

            conn.on("ReceiveSpecificMessage", (username, msg) => {
                setMessages(messages => [...messages, { username, msg }])
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
            <div>
                {!conn ? <WaitingRoom joinChatRoom={joinChatRoom} ></WaitingRoom> : <ChatRoomClass messages={messages} sendMessage={sendMessage}></ChatRoomClass>}
            </div>
        </>
    )
}
export default Chat;