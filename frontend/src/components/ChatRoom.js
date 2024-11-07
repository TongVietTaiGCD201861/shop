import { Col, Row } from "react-bootstrap";
import MessageContainerClass from "./messageContainer";
import SendMessageForm from "./sendMessage";

const ChatRoomClass = ({ messages, sendMessage }) =>
    <div>
        <Row className="px-5 py-5">
            <Col sm={12}>
                <MessageContainerClass messages={messages} />
            </Col>
            <Col sm={12}>
                <SendMessageForm sendMessage={sendMessage} />
            </Col>
        </Row>
    </div>
export default ChatRoomClass;