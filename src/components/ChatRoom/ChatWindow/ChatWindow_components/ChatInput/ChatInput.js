import "./ChatInput.css";
import { Form, Button, Row, Col } from "react-bootstrap";

const ChatInput = () => {
    return (
        <div className="chat-input-container">
            <Row>
                <Col md={10}>
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Enter your message here"
                    ></Form.Control>
                </Col>
                <Col md={2}>
                    <Button size="lg" style={{ width: "100%" }}>
                        Send
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default ChatInput;
