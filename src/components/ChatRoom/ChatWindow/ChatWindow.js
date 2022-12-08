import "./ChatWindow.css";
// import { Container } from "react-bootstrap";
import ChatTitle from "./ChatWindow_components/ChatTitle/ChatTitle";
import ChatBody from "./ChatWindow_components/ChatBody/ChatBody";
import ChatInput from "./ChatWindow_components/ChatInput/ChatInput";
import { Card } from "react-bootstrap";

const ChatWindow = () => {
    return (
        <div className="chatwindow-container">
            <Card style={{ height: "600px" }}>
                <Card.Body>
                    <Card.Header>
                        <ChatTitle />
                    </Card.Header>
                    <Card.Text style={{ height: "400px" }}>
                        <ChatBody />
                    </Card.Text>
                    <Card.Footer>
                        <ChatInput />
                    </Card.Footer>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ChatWindow;
