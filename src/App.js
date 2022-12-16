import "bootstrap/dist/css/bootstrap.min.css";
import ChatNavbar from "./components/Navbar/Navbar";
import LoginForm from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Error from "./components/ErrorHandler/404";
import ChatRoom from "./components/ChatRoom/ChatRoom";

function App() {
    return (
        <div className="App">
            <ChatNavbar />
            <Routes>
                <Route exact path="/" element={<LoginForm />} />
                <Route exact path="/SignUp" element={<SignUp />} />
                <Route exact path="/Chatroom" element={<ChatRoom />} />
                <Route exact path="*" element={<Error />} />
            </Routes>
        </div>
    );
}

export default App;
