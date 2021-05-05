import { API_BASE_URL } from "./social";
import { getCookie } from "./Cookie";

const request = (options) => {
    const headers = new Headers({
        "Content-Type": "application/json",
    });

    if (getCookie("accessToken")) {
        headers.append("Authorization", "Bearer " + getCookie("accessToken"));
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options).then((response) =>
        response.json().then((json) => {
            if (!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if (!getCookie("is_login", "jwtToken")) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: "GET",
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: "POST",
        body: JSON.stringify(loginRequest),
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: "POST",
        body: JSON.stringify(signupRequest),
    });
}
