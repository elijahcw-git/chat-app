import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Navbar.css";

const ChatNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container className="nav-container">
                <Navbar.Brand>Chabble</Navbar.Brand>
                <Nav variant="pills" className="navbar-links">
                    <Link className="nav-link" to="/">
                        Home
                    </Link>
                    <Link className="nav-link" to="../SignUp">
                        Sign Up
                    </Link>
                    <Link className="nav-link" to="../ChatRoom">
                        ChatRoom
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default ChatNavbar;
