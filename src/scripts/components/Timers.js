import React from "react";
import PropTypes from "prop-types";
import NodeGroup from "react-move/NodeGroup";
import Timer from "./Timer";

export default class Timers extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            interval: false
        };
        this.style = {
            height: 148,
            margin: "18px 0px 24px",
            y: 172
        }
    }
    componentDidMount(){
        if(this.props.items.length !== 0){
            this.props.update_timer();
            this.props.set_interval_global();
            this.setState({
                interval: true
            });
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.items.length !== 0 && !this.state.interval){
            this.props.set_interval_global();
            this.setState({
                interval: true
            });
        }
        if(this.props.items.length === 0 && this.state.interval){
            this.setState({
                interval: false
            });
            this.props.clear_interval_global();
        }
    }
    render(){
        let props = this.props;
        return(
            <NodeGroup
                data={props.items}
                keyAccessor={(d)=>d.id}
                start={()=>({
                    opacity: [0],
                    top: [0]
                })}
                enter={(d, i)=>{
                    return {
                        opacity: [1],
                        top: [this.style.y * i],
                    }
                }}
                leave={()=>({
                    opacity: [0],
                })}
                update={(d,i)=>{
                    return {
                        top: [this.style.y * i],
                    }
                }}
            >
                {nodes => {
                    return(
                        <ul>
                            {nodes.map((items,index) => {
                                const {key, data, state} = items;
                                return (
                                    <li 
                                        key={"timer-" + key}
                                        style={{
                                            height: this.style.height,
                                            margin: this.style.margin,
                                            opacity: state.opacity,
                                            top: state.top + "px"
                                        }}
                                    >
                                        <Timer
                                            data={data}
                                            update_timer={props.update_timer}
                                            delete_timer={props.delete_timer}
                                            set_interval={props.set_interval}
                                            stop_timer={props.stop_timer}
                                            resume_timer={props.resume_timer}
                                            update_memo={props.update_memo}
                                            set_itnerval_global={props.set_itnerval_global}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    )
                }}

            </NodeGroup>
        );
    }
}

Timers.propTypes = {
    item: PropTypes.array
};