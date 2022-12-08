import axios from "axios";
import { useState } from "react";

const ServerTest = () => {
    const [data, setData] = useState([]);
    const getData = () => {
        axios
            .get("/profile")
            .then((data) => {
                setData(data.data.name);
            })
            .catch((error) => {
                console.log(error);
            });
        return data;
    };

    return <div>{getData()}</div>;
};

export default ServerTest;
