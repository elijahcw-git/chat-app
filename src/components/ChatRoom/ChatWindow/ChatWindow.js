import "./ChatWindow.css";
import { Container, Card } from "react-bootstrap";
import ChatTitle from "./ChatWindow_components/ChatTitle/ChatTitle";
import ChatBody from "./ChatWindow_components/ChatBody/ChatBody";
import ChatInput from "./ChatWindow_components/ChatInput/ChatInput";

const ChatWindow = () => {
    return (
        <Container className="chatwindow-container">
            <Card>
                <Card.Body>
                    <Card.Header>
                        <ChatTitle />
                    </Card.Header>
                    <Card.Text className="chat-body">
                        <ChatBody />
                        <ChatInput />
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ChatWindow;
