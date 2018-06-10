import _ from "underscore";

export default function alias(){
    let func = _.first(arguments);
    let tail = _.rest(arguments);
    return function(){
        let iteratee = _.last(arguments);
        let head = _.initial(arguments);
        let result = iteratee.apply(iteratee, head);
        let args = Array.prototype.concat.apply(tail, result);
        return func.apply(func, _.toArray(args))
    }
}