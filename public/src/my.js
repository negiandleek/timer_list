import _ from "underscore";
(function (){
    const root = (typeof window == 'object' && window.self === self && window) ||
                (typeof global == 'object' && global.global === global && global) ||
                {};

    const previous = root.My;
    const TYPE = {
        "FOUR": 4,
        "SIX": 6
    };

    let My = class My{
        constructor(str){
            let type = str.toUpperCase();
            if(!My.reg_type.test(type)){
                throw new Error(str + "not defined. type are [FOUR],[SIX]")
            }
            this.__type = type; //4,6;
        }
    }
    const p = My.prototype;

    if (typeof exports !== 'undefined') {
        // Support Node.js specific `module.exports`
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = My;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.My = My;
    }else{
        root.My = My;
    }
    
    My.reg_type = /^(?:FOUR)|(?:SIX)$/;
    My.reg_hour_second = /^[0-9]{1,4}$/;
    My.reg_time_split = /([0-9]{2})(?=[0-9]{2})/g;
    My.reg_non_zero = /^(0+)([1-9]*)$/g;

    p.display = function(value){
        return value.replace(My.reg_time_split,(match)=> match + ":");
    }

    p.is_hour_second = function(value){
        if(!_.isString(value)){
            return ("[HourSecond] must be string type]");
        }
        if(value.length > TYPE[this.__type]){
            throw new Error("[HourSecond] length must be four");
        }
        if(!My.reg_hour_second.test(value)){
            throw new Error("[HourSecond] must be string of number");                
        }
        return true;
    }

    p.zero_padding = function(value){
        // check type
        this.is_hour_second(value);

        let str = new Array(TYPE[this.__type] + 1).join("0");
        return (str + value).slice(-1 * TYPE[this.__type]);
    }

    p.zero_unpadding = function(value){
        // check type
        this.is_hour_second(value);

        let r = value.replace(My.reg_zero, (match, $1, $2)=>{
            return typeof $2 === "undefined"? 0: $2;
        });
        
        return r;
    }

    p.increment = function(value){
        // check type
        this.is_hour_second(value);

        let r = Number(this.zero_unpadding(value)) + 1;
        
        return this.zero_padding(r);
    }

    p.decrement = function(value){
        // check type
        this.is_hour_second(value);

        let r = Number(this.zero_unpadding(value)) - 1;
        
        return this.zero_padding(r);
    }
})()