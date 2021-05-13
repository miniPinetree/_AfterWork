import React from "react";
import { ACCESS_TOKEN } from "./social";
import { setCookie } from "./Cookie";
import { Redirect } from "react-router-dom";

function OAuth2RedirectHandler(props) {
    const getUrlParameter = (name) => {
        name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
        let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

        let results = regex.exec(props.location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    const token = getUrlParameter("token");
    const error = getUrlParameter("error");

    if (token) {
        setCookie(ACCESS_TOKEN, token);
        return (
            <Redirect
                to={{
                    pathname: "/",
                }}
            />
        );
    } else {
        return (
            <>
                <Redirect
                    to={{
                        pathname: "/",
                        error: error,
                    }}
                />
            </>
        );
    }
}

export default OAuth2RedirectHandler;
