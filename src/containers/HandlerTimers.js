import {connect} from "react-redux";
import Timers from "../components/Timers";
import {add_timer, change_input, init_input} from "../actions";


// timer_list component -> timersに変更　App.js参照
const mapStateToProps = state => ({
    timers: state.timers
});
  
const mapDispatchToProps = dispatch => ({
    add_timer: data => dispatch(add_timer(data)),
    change_input: count => dispatch(change_input(count)),
    init_input: () => dispatch(init_input())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timers);