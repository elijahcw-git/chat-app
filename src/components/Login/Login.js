import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import { Button } from "react-bootstrap";
import axios from "axios";

const LoginForm = ({ isLoggedIn, setIsLoggedIn }) => {
    const [loginUserName, setLoginUserName] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginAttempt, setLoginAttempt] = useState(false);
    const navigate = useNavigate();

    const loginInfo = {
        username: loginUserName,
        password: loginPassword,
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(e);
        axios
            .post("/app/login", loginInfo)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    setIsLoggedIn(true);
                    setLoginAttempt(false);
                    navigate("../ChatRoom");
                }
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    setIsLoggedIn(false);
                    setLoginAttempt(true);
                } else {
                    console.log(error);
                }
            });
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleLogin}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter your username"
                            onChange={(e) => {
                                setLoginUserName(e.target.value);
                            }}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            onChange={(e) => {
                                setLoginPassword(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <Button type="submit">Login</Button>
                    </div>
                </div>
                {loginAttempt ? (
                    <p className="bad-login">
                        Invalid credentials, please try again
                    </p>
                ) : (
                    <></>
                )}
            </form>
        </div>
    );
};

export default LoginForm;
