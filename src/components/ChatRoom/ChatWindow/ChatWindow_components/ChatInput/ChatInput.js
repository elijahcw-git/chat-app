import "./ChatInput.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const ChatInput = ({ userId }) => {
    const [newMessage, setNewMessage] = useState("");

    const messageData = {
        user: userId,
        messagetext: newMessage,
    };

    const sendMessage = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                Authorization: localStorage.getItem("jwt"),
            },
        };

        axios.post("/app/message", messageData, config).then((res) => {
            console.log(res);
            setNewMessage("");
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
                        value={newMessage}
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
