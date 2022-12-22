import "./ChatInput.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const ChatInput = () => {
    const [newMessage, setNewMessage] = useState("");

    const messageData = {
        messagetext: newMessage,
    };

    const sendMessage = (e) => {
        e.preventDefault();
        axios.post("/app/messages", messageData).then((res) => {
            console.log(res);
        });
    };

    return (
        <div className="chat-input-container">
            <Row>
                <Col md={10}>
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Enter your message here"
                        onChange={(e) => setNewMessage(e.target.value)}
                    ></Form.Control>
                </Col>
                <Col md={2}>
                    <Button
                        size="lg"
                        onClick={sendMessage}
                        style={{ width: "100%" }}
                    >
                        Send
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default ChatInput;
