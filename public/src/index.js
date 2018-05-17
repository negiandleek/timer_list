import React from "react";
import ReactDOM from "react-dom";

class Hello extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <p>Hello!!</p>
    }
}

ReactDOM.render(
    <Hello />,
    document.getElementById("root")
)