// import ServerTest from "./components/ServerTest";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatNavbar from "./components/Navbar/Navbar";
import LoginForm from "./components/Login/Login";

function App() {
    return (
        <div className="App">
            <ChatNavbar />
            {/* <LoginForm /> */}
            <ChatRoom />
        </div>
    );
}

export default App;
