import React from "react";
import ReactDOM from "react-dom";

class TimerManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: [[
                {parent_id: 0, child_id: 0, count: 0}
            ]]
        };
    }
    render(){
        return(
            <div className="timer_list">
                {this.state.items.map((items)=>(
                    <Timers
                        tick={this.tick.bind(this)}
                        items={items}
                    />
                ))}
            </div>
        )
    }
    tick(){
        const args = arguments;
       
        let new_state = this.state.items.slice();
        new_state[args.parent_id][child_id].count += 1;
      
        this.setState(()=>({
            items: new_state
        }));
    }
}

const Timers = (props) => {
    return (
        <ul>
            {props.items.map((item, i) => (
                <li>
                    <Timer 
                        item={item}
                        tick={props.tick}
                    />
                </li>
            ))}
        </ul>
    )
}

class Timer extends React.Component{
    constructor(props){
        super(props);
        this.interval;
    }
    render(){
        return (
            <div className="timer">
                {this.props.item.count}
                <div className="timer__btns">
                    <input type="button" value="start" onClick={this.start.bind(this)} />
                    <input type="button" value="stop" onClick={this.stop.bind(this)} />
                </div>
            </div>
        )
    }
    start(){
        const temp = this.props.item;
        this.interval = setInterval(() => this.props.tick(
            {
                parent_id: temp.parent_id,
                child_id: temp.child_id
            }
        ), 1000);
    }
    stop(){
        clearInterval(this.interval);
    }
}

ReactDOM.render(
    <TimerManager />,
    document.getElementById("root")
)