import React from "react";
import PropTypes from "prop-types";
import whiterabbit from "../modules/index";

function pin_right(_prev, _next){
    let origin = _next;
    let next = _next.slice(1,4);
    let prev = _prev.slice(1);
    let diff = "";
    let index = 0;
    if(next === prev)return origin;
    
    for(;index < next.length; index+=1){
        if(next[index] !== prev[index]){
            diff = next[index];
            break;
        }
    }
    let pro = origin.split("");
    pro.splice(index + 1, 1);
    pro.push(diff);
    return pro.join("");;
}

export default class TimerForm extends React.Component{
    constructor(props){
        super(props);
        this.my_ref = React.createRef();
    }
    handle_change(e){
        let value = e.target.value;
        let undisp = whiterabbit.undisplay(value);
        if(undisp.length === 5){
            undisp = pin_right(this.props.form.count, undisp);
        }
        let result = whiterabbit.shift_clock(this.props.form.count, undisp);
        if(!/^[0-9]+$/g.test(result)){
            result = this.props.form.count;
        };
        this.props.change_input(result);
    }
    handle_click(alarmFlag){
        if(!Number(this.props.form.count)){
            return void 0;
        }
        
        let date = whiterabbit.generate_dms(this.props.form.count, alarmFlag);
        let diff = whiterabbit.diff_dms(date);
        let count = whiterabbit.get_count(diff, alarmFlag, 1, 2);
        
        this.props.add_timer(
            count,
            date,
            alarmFlag? true: false
        )
        this.props.init_input();
    }
    render(){
        let for_display = whiterabbit.display(this.props.form.count);
        return (
            <div className="timer_input">
                <form 
                    className="timer_form"
                    action="javascript:void(0)"
                >
                    <input 
                        className="timer_form__text"
                        type="text"
                        value={for_display}
                        onChange={(e) => this.handle_change(e)}
                        ref={this.my_ref}
                    />
                    <div className="form_btns">
                        <input 
                            className="form_btns__btn"
                            type="button" 
                            value="count down"
                            onClick={this.handle_click.bind(this, false)}
                        />
                        <input 
                            className="form_btns__btn"
                            type="button"
                            value="alarm"
                            onClick={this.handle_click.bind(this, true)}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

TimerForm.propTypes = {
    form: PropTypes.shape({
        count: PropTypes.string.isRequired,
        type: PropTypes.number.isRequired
    })
}
