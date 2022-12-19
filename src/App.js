import "bootstrap/dist/css/bootstrap.min.css";
import ChatNavbar from "./components/Navbar/Navbar";
import LoginForm from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Error from "./components/ErrorHandler/404";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import Protected from "./components/Protected";
import { useState } from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="App">
            <ChatNavbar />
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <LoginForm
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                        />
                    }
                />
                <Route exact path="/SignUp" element={<SignUp />} />
                <Route
                    path="/Chatroom"
                    element={
                        <Protected isLoggedIn={isLoggedIn}>
                            <ChatRoom />
                        </Protected>
                    }
                />
                <Route exact path="*" element={<Error />} />
            </Routes>
        </div>
    );
}

export default App;
