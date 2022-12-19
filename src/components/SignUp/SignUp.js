import { useState } from "react";
import axios from "axios";

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userInfo = {
        username: userName,
        userEmail: email,
        userPassword: password,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/app/users", userInfo)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Create an Account</h3>
                    <div className="form-group mt-3">
                        <label>UserName</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="UserName"
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Create a password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button className="btn btn-primary">Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
