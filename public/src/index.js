import React from "react";
import ReactDOM from "react-dom";

class Timer extends React.Component{
    constructor(props){
        super(props);
        this.interval;
        this.state = {
            count: 0
        };
    }
    componentDidMount(){
        this.interval = setInterval(this.tick.bind(this), 1000)
    }
    render(){
        return (
            <div className="timer">
                {this.state.count}
            </div>
        )
    }
    tick(){
        this.setState((prevState)=>({
            count: prevState.count + 1
        }));
    }
}

ReactDOM.render(
    <Timer />,
    document.getElementById("root")
)