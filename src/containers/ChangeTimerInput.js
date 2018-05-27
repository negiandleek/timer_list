import {connect} from "react-redux";
import TimerInput from "../components/TimerInput";
import {add_timer, change_input, init_input} from "../actions";

const mapStateToProps = state => ({
    form: state.form
});
  
const mapDispatchToProps = dispatch => ({
    add_timer: data => dispatch(add_timer(data)),
    change_input: count => dispatch(change_input(count)),
    init_input: () => dispatch(init_input())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimerInput);