import ChatUsers from "./ChatUsers/ChatUsers";
import ChatWindow from "./ChatWindow/ChatWindow";
import { Container, Row, Col } from "react-bootstrap";
const ChatRoom = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col xs={2}>
                        <ChatUsers />
                    </Col>
                    <Col md={10}>
                        <ChatWindow />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ChatRoom;
