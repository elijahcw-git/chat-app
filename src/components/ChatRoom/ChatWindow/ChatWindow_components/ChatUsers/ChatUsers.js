import { Card } from "react-bootstrap";
import "./ChatUsers.css";
const ChatUsers = () => {
    return (
        <div className="chat-users-container">
            <Card>
                <Card.Header>Chat Users</Card.Header>
                <Card.Body>
                    <p>Name1</p>
                    <p>Name2</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ChatUsers;
