import React from "react";
import PropTypes from "prop-types";
import ticktack from "../modules/index";

import TimerInput from "./TimerInput";
import Timers from "./Timers";

export default class App extends React.Component{
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
                    handle_change={this.handle_change.bind(this)}
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
    handle_change(e){
        const undisp = ticktack.undisplay(e.target.value);
        const result = ticktack.shift_time_to_input(this.state.count, undisp);
        this.setState({
            count: result
        });
    }
    tick(){
        const args = arguments[0];
       
        let new_state = this.state.items.slice();
        let temp = new_state[args.parent_id][args.child_id];
        let r = ticktack.forward_time(temp.count);
        temp.count = r;

        this.setState(()=>({
            items: new_state
        }));
    }
}