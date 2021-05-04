import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./shared/App";
import axios from "axios";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/configStore";
import { getCookie } from "./shared/Cookie";

axios.interceptors.request.use((config) => {
    const token = getCookie("is_login");
    config.headers.Authorization = `Bearer ${token}`;

    return config;
});
axios.defaults.baseURL = "https://afterwork-webservice.site";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
