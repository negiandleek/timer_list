import React from "react";
import PropTypes from "prop-types";
import ticktack from "../modules/index";

import ChangeTimerInput from "../containers/changeTimerInput";
import HandlerTimers from "../containers/HandlerTimers";

export default class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <main className="main">
                <ChangeTimerInput />
                <HandlerTimers />
                {/*<div className="timer_list">
                    {this.props.map((items,i)=>(
                        <Timers
                            // tick={this.tick.bind(this)}
                            // set_interval_id={this.set_interval_id.bind(this)}
                            items={items}
                            // index={i}
                            key={"timers-" + i}
                        />
                    ))}
                </div>*/}
            </main>
        )
    }
    // handle_submit(){
    //     let s = this.state;
    //     let parent_id = s.type;
    //     let sign = Number(s.count) === 0? 1: -1;

    //     let payload = {
    //         parent_id: parent_id,
    //         child_id: this.task_index,
    //         count: s.count,
    //         sign: sign,
    //         interval_id: ""
    //     };
        
    //     let new_state = this.state.items.slice();
    //     new_state[parent_id].push(payload);

    //     this.setState({
    //         count: "0000",
    //         items: new_state,
    //         type: 0
    //     });
    //     this.task_index += 1;
    // }
    tick(){
        const parent_id = arguments[0];
        const child_id = arguments[1];
        const sign = arguments[2];

        let new_state = this.state.items.slice();
        let temp;
        let index;

        for(let i = 0; i < new_state[parent_id].length; i += 1){
            if(new_state[parent_id][i].child_id === child_id){
                temp = new_state[parent_id][i];
                index = i;
            }
        }

        let r = ticktack.forward_time(temp.count, sign * 100);
        temp.count = r;

        if(r < 0){
            clearInterval(new_state[parent_id][index].interval_id);
            new_state[parent_id].splice(index, 1);
        }

        this.setState(()=>({
            items: new_state
        }));
    }
    set_interval_id(){
        const parent_id = arguments[0];
        const child_id = arguments[1];
        const intervalId = arguments[2];
        
        let new_state = this.state.items.slice();
        let index;
        let temp;

        for(let i = 0; i < new_state[parent_id].length; i += 1){
            if(new_state[parent_id][i].child_id === child_id){
                temp = new_state[parent_id][i];
                index = i;
            }
        }

        temp.interval_id = intervalId;

        this.setState(()=>({
            items: new_state
        }));
    }
}