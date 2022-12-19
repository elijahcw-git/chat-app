import React from "react";
import "./Login.css";
import { Button } from "react-bootstrap";

const LoginForm = ({ isLoggedIn, setIsLoggedIn }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        !isLoggedIn ? setIsLoggedIn(true) : setIsLoggedIn(false);
        console.log(isLoggedIn);
    };

    const logIn = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
    };

    const logOut = (e) => {
        e.preventDefault();
        setIsLoggedIn(false);
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        {isLoggedIn ? (
                            <Button onClick={logOut}>Logout</Button>
                        ) : (
                            <Button onClick={logIn}>Login</Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
