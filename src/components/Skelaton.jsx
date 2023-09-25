import React from 'react'

const Skelaton = ({ width = "300px", height = "300px", message = "msg_ph" }) => {

    const skelaton_style = {
        width: width, 
        height: height, 
        border: "1px solid",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        fontColor: "black",
        fontWeight: "700",

    }

    return (
        <div style={skelaton_style}>{message}</div>
    )
}

export default Skelaton