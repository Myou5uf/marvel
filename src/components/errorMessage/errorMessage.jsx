import React from 'react';
import img from "./error.gif";

const ErrorMessage = ({error}) => {
    return (
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "5px 10px"}}>
            <p style={{fontSize: "24px", color: "red"}}>{error.message}</p>
            <img
                style={{
                    display: "block",
                    width: "250px",
                    height: "250px",
                    objectFit: "contain",
                    margin: "0 auto"
                }}
                src={img} alt="Error message"
            />
        </div>
    );
};

export default ErrorMessage;