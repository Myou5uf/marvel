import React from 'react';
import ErrorMessage from "../components/errorMessage/errorMessage";
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <ErrorMessage error="Page doesn't exist"/>
            <Link to="/" style={{display: "block", textAlign: "center", fontWeight: "bold", fontSize: "24px", marginTop: "30px", textTransform: "uppercase", textDecoration: "underline"}}>
                Back to main page
            </Link>
        </div>
    );
};

export default ErrorPage;