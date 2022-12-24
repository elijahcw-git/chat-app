import ChatUsers from "./ChatWindow/ChatWindow_components/ChatUsers/ChatUsers";
import ChatWindow from "./ChatWindow/ChatWindow";
import "./ChatRoom.css";
import { Container, Row, Col } from "react-bootstrap";
const ChatRoom = ({ userId }) => {
    return (
        <>
            <Container className="chatroom-container">
                <Row>
                    <Col xs={2} className="users">
                        <ChatUsers userId={userId} />
                    </Col>
                    <Col md={10} className="window">
                        <ChatWindow userId={userId} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ChatRoom;
