import _ from "underscore";
const reg = /[,]/g;

export default function(){
    return _.chain(arguments).map((args)=>{
        if(!_.isArray(args)){
            return args.split(reg)
        }else{
            return args;
        }
    }).flatten().value();
}