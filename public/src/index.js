"use strict"
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import My from "./my";

const my = new My("FOUR");

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count: "0000",
            type: 0,
            /*[
                [
                    {parent_id:0,child_id:0,},
                    {parent_id:0, child_id:1}
                ],
                [
                    {parent_id:1, child_id:0}
                ],
            ]*/
            items: [[],[],[]]
        };
    }
    render(){
        return(
            <main className="main">
                <TimerInput 
                    {...this.state}
                    handle_submit={this.handle_submit.bind(this)}
                />
                <div className="timer_list">
                    {this.state.items.map((items,i)=>(
                        <Timers
                            tick={this.tick.bind(this)}
                            items={items}
                            index={i}
                            key={"timers-" + i}
                        />
                    ))}
                </div>
            </main>
        )
    }
    handle_submit(){
        let s = this.state;
        let parent_id = s.type;
        let payload = {
            parent_id: parent_id,
            child_id: s.items[s.type].length,
            count: s.count
        };
        
        let new_state = this.state.items.slice();
        new_state[parent_id].push(payload);

        this.setState({
            count: "0000",
            type: 0,
            items: new_state
        });
    }
    tick(){
        const args = arguments[0];
       
        let new_state = this.state.items.slice();
        let temp = new_state[args.parent_id][args.child_id];
        let r = my.increment(temp.count);
        temp.count = r;

        this.setState(()=>({
            items: new_state
        }));
    }
}

class TimerInput extends React.Component{
    constructor(props){
        super(props);
    }
    // getDerivedStateFromProps(nextProp, prevState){

    // }
    render(){
        return (
            <div className="timer-input">
                <form 
                    className="timer-input__form"
                    action="javascript:void(0)"
                    onSubmit={this.props.handle_submit}
                >
                    <input 
                        type="text"
                        value={this.props.count}
                        readOnly
                    />
                    <input 
                        type="submit" 
                        value="add"
                    />
                </form>
            </div>
        )
    }
}

TimerInput.propTypes = {
    count: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired
}

const Timers = (props) => {
    return (
        <ul>
            {props.items.map((item, i) => (
                <li key={"timer-" + props.index + "-" + i}>
                    <Timer 
                        data={item}
                        tick={props.tick}
                    />
                </li>
            ))}
        </ul>
    )
}

Timers.propTypes = {
    item: PropTypes.array
};

class Timer extends React.Component{
    constructor(props){
        super(props);
        this.interval;
    }
    componentDidMount(){
        this.start();
    }
    render(){
        return (
            <div className="timer">
                {this.props.data.count}
                <div className="timer__btns">
                    <input type="button" value="start" onClick={this.start.bind(this)} />
                    <input type="button" value="stop" onClick={this.stop.bind(this)} />
                </div>
            </div>
        )
    }
    start(){
        if(this.interval)return;
        
        const props = this.props.data;
        this.interval = setInterval(() => this.props.tick(
            {
                parent_id: props.parent_id,
                child_id: props.child_id
            }
        ), 1000);
    }
    stop(){
        clearInterval(this.interval);
    }
}

Timer.propTypes = {
    count: PropTypes.number,
    data: PropTypes.shape({
        parent_id: PropTypes.number,
        child_id: PropTypes.number
    })
};

ReactDOM.render(
    <App />,
    document.getElementById("root")
)